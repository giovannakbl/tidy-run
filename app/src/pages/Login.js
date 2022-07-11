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
    checkLogin();
  }, []);

  return (
    <>
      <main>
        {isSubmitted && auth.status === "rejected" && (
          <Alert type="error" message={auth.error.error_message_api} />
        )}
        <>
        <h1 className="page-main-title">Tidy Run</h1>
          <form className="standard-form" onSubmit={handleSubmit}>
          <h2 className="register-login-title">Login</h2>
            <label className="standard-label"
            htmlFor="username">Email</label>
            <input
              id="username"
              name="username"
              type="email"
              onChange={handleInputChange}
              value={formValues.username}
              className="standard-text-input"
              required
            />
            <label className="standard-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              value={formValues.password}
              className="standard-text-input"
              required
            />
            <div className="card-row-buttons-center">
            <button className="card-button" type="submit">Login</button>
            </div>
          </form>
          <button
            className="register-login-button"
            onClick={() => navigate("/register")}
          >
            <p className="register-login-text-sec">You don't have an account?</p>
            <p className="register-login-text-main">Go to Register</p>
          </button>
        </>
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
