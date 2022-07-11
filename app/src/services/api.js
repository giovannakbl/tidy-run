import axios from "axios";
import { store } from "../store";
import { refreshToken } from "../store/Auth/actions";
import { useCookies } from "react-cookie";
const { dispatch } = store;

// const getErrorDetail = (err) => {
//   const errorMapping = {
//     401: "Incorrect Email or Password",
//     601: "User Not Found",
//     602: "Home Member Not Found",
//     603: "This Email is already registered",
//     604: "Model Task Not Found",
//     605: "Challenge Not Found",
//     606: "Task Not Found",
//   };
//   return (
//     (err.data.status_code && errorMapping[err.data.status_code]) ||
//     "Something went wrong"
//   );
// };

const getErrorDetail = (status_code) => {
  






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
    (status_code && errorMapping[status_code]) ||
    "Something went wrong"
  );
};

const instance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "http://192.168.88.110:8000/api",
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
      config.url !== `/api/v1/tidy_user/register` &&
      config.url !== `/token/invalidate`
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

// instance.interceptors.response.use(
//   	(res) => {
//   	  return res;
//   	},
//   	async (err) => {
//       const {config, response} = err

//       if (response.status !== 401 && config.url !== "/login_check") {
//         err.error_message_api = getErrorDetail(response)
//         return Promise.reject(err);
//       } else if (config.url === "/login_check") {
//         return Promise.reject(err);
//       }
//       if(config.url==='/token/refresh') {
//         return Promise.reject(err);
//       }
//       const loading = store.getState().auth.loading;
//       console.log(err.config.url);
//   	  if (!loading) {
//         console.log('request refresh');
//         try {
//           await dispatch(refreshToken())
//           queue.forEach(resolve => resolve(true))
//           queue = []
//           return instance.request(err.config)
//         } catch (err) {
//           queue.forEach(resolve => resolve(false))
//           queue = []
//           return Promise.reject(err);
//         }
//   	  } else {
//         console.log('already loading');
//         return new Promise( ( resolve, reject ) => queue.push( (resolved) => {
//           if (resolved) {
//             return resolve(instance(config))
//           } else {
//             return reject()
//           }
//          }
//         ) )
//       }
//   	}
//   );





// Teste novo

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const {config, response} = err;
  


// if (err.response.data !== undefined && err.response.data.status_code !== undefined) {
//     err.response.data.error_message_api = getErrorDetail(response.data.status_code);
//   } else {
//     let oldErr = err;
//     let newErr = {
//       status_code : oldErr.response.status,
//       error_message_api : getErrorDetail(oldErr.response.status)
//     }
//     // newErr.error_message_api = getErrorDetail(oldErr.response.status);
//     err.response.data = newErr;
//   }
// console.log("Como esta");
// console.log(err.response.data);
//     if (response.status !== 401 && config.url !== "/login_check") {
//       // err.error_message_api = getErrorDetail(response)
//       return Promise.reject(err);
//     } else if (config.url === "/login_check") {
//       return Promise.reject(err.response.data);
//     }
// console.log("Esse é o erro");
// console.log(err);
if (err.response.data !== undefined && err.response.data.status_code !== undefined) {
  err.response.data.error_message_api = getErrorDetail(err.response.data.status_code);
} else {
  let oldErr = err.response;
  let newErr = {
    status_code : oldErr.status,
    error_message_api : getErrorDetail(oldErr.status)
  }
  // newErr.error_message_api = getErrorDetail(oldErr.response.status);
  err.response.data = newErr;
}
// console.log("Como esta");
// console.log(err.response.data);
  if (response.status !== 401 && config.url !== "/login_check") {
    // err.error_message_api = getErrorDetail(response)
    return Promise.reject(err.response);
  } else if (config.url === "/login_check") {
    return Promise.reject(err.response);
  }











    if(config.url==='/token/refresh') {
      return Promise.reject(err);
    }
    const loading = store.getState().auth.loading;
    console.log(err.config.url);
    if (!loading) {
      console.log('request refresh');
      try {
        await dispatch(refreshToken())
        queue.forEach(resolve => resolve(true))
        queue = []
        return instance.request(err.config)
      } catch (err) {
        queue.forEach(resolve => resolve(false))
        queue = []
        return Promise.reject(err);
      }
    } else {
      console.log('already loading');
      return new Promise( ( resolve, reject ) => queue.push( (resolved) => {
        if (resolved) {
          return resolve(instance(config))
        } else {
           
          return reject()
        }
       }
      ) )
    }
  }
);















  // if (err.response.data !== undefined && err.response.data.status_code !== undefined) {
  //   err.error_message_api = getErrorDetail(response);
  // } else {
  //   let oldErr = err;
  //   err = {
  //     data: {
  //       status_code: oldErr.response.status,
  //     },
  //   };
  //   err.error_message_api = getErrorDetail(err);
  // }









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
