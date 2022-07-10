import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginRequest } from "../store/Auth/actions";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tidyUserRequest } from "../store/TidyUser/actions";
import Alert from "../components/alert/Alert";
import Spinner from "../components/spinner/Spinner";
import { useCookies } from "react-cookie";

const Login = ({ auth, loginRequest, tidyUserRequest, tidyUser }) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);
  const handleCookieLogin = () => {
    setCookie("isLoggedIn", "yes", { path: "/" });
  };
  const handleCookieLogout = () => {
    setCookie("isLoggedIn", "no", { path: "/" });
  };
  const handleInputChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsSubmitted(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await loginRequest(formValues);
      handleCookieLogin();
      navigate("/");
    } catch (error) {
      handleCookieLogout();
    }
  };
  const checkLogin = async () => {
    if (cookies.isLoggedIn === "yes") {
    try {
    await tidyUserRequest();
    navigate("/");
    } catch(e) {
      handleCookieLogout();
    }
  }
  };
  useEffect(() => {
    console.log("verifiquei autenticacao na pag login");
    checkLogin();
  }, []);
  // useEffect(() => {
  //   if (cookies.isLoggedIn === "yes") {
  //     checkLogin();
  //     // console.log("redirecao");
  //     // navigate("/");
  //   }
  // }, []);

  // if (
  //    !auth.idle && !auth.loading && auth.authenticated) 

  //   return <Navigate to="/" replace />;
  

  return (
    <>
      <main>
        {isSubmitted && auth.status === "rejected" && (
          <Alert type="error" message={auth.error.error_message_api} />
        )}
        {/* {auth.status === 'idle' || auth.status === 'loading'  ? <Spinner/> :  */}
        <>
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="username">Email</label>
            <input
              id="username"
              name="username"
              type="email"
              onChange={handleInputChange}
              value={formValues.username}
              className="input-text"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={formValues.password}
              className="input-text"
              required
            />
            <button type="submit">Login</button>
          </form>
          <button
            className="register-login-button"
            onClick={() => navigate("/register")}
          >
            <p className="standard-info">You don't have an account?</p>
            <p className="custom-info">Go to Register</p>
          </button>
        </>
        {/* } */}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser: state.tidyUser,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginRequest,
      tidyUserRequest,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
