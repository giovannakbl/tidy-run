import axios from "axios";
import { store } from "../store";
import { refreshToken } from "../store/Auth/actions";
const { dispatch } = store;

const getErrorDetail = (err) => {
  const errorMapping = {
    401: "Incorrect Email or Password",
    601: "User Not Found",
    602: "Home Member Not Found",
    603: "This Email is already registered",
    604: "Model Task Not Found",
    605: "Challenge Not Found",
    606: "Task Not Found",
  };
  return (
    (err.data.status_code && errorMapping[err.data.status_code]) ||
    "Something went wrong"
  );
};

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // console.log(config);
    if (
      config.url !== "/token/refresh" &&
      config.url !== "/login_check" &&
      config.url !== `/api/v1/tidy_user/register`
    ) {
      const token = store.getState().auth.data.token;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let queue = [];

instance.interceptors.response.use(
  	(res) => {
  	  return res;
  	},
  	async (err) => {
      const {config, response} = err
      if (response.status !== 401 && config.url !== "/login_check") {
        err.error_message_api = getErrorDetail(response)
        return Promise.reject(err);
      }
      const loading = store.getState().auth.loading;
  	  if (!loading) {
        try {
          await dispatch(refreshToken())
          queue.forEach(resolve => resolve())
          queue = []
          return instance.request(err.config)
        } catch (err) {
          
        }
  	  } else {
        return new Promise( (resolve) => queue.push( () => resolve(instance(config) ) ) )
      }
  	}
  );

// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const { config, response } = err;

//     if(

//         response.status !== 401 

//        ||
//       config.url === "/login_check"
//       ){
//       console.log("Hello");
//       console.log(err);
//       if (
//         err.response.data !== undefined &&
//         err.response.data.status_code !== undefined
//       ) {
//         err.error_message_api = getErrorDetail(response);
//       } else {
//         let oldErr = err;
//         err = {
//           data: {
//             status_code: oldErr.response.status,
//           },
//         };
//         err.error_message_api = getErrorDetail(err);
//       }
//       console.log(err);
//       return Promise.reject(err);
//     } 
//       const loading = store.getState().auth.loading;
//       	  if (!loading) {
//             try {
//               await dispatch(refreshToken())
//               queue.forEach(resolve => resolve())
//               queue = []
//               return instance.request(err.config)
//             } catch (err) {
              
//             }
//       	  } else {
//             return new Promise( (resolve) => queue.push( () => resolve(instance(config) ) ) )
//           }
//   }
// );

export default instance;
