import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutRequest } from "../store/Auth/actions";
import { bindActionCreators } from "redux";

const Header = ({ auth, logoutRequest }) => {
  let navigate = useNavigate();
  const handleLogout = async () => {
    await logoutRequest();
  };

  return (
    <>
      <header className="header">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/challenge-list");
          }}
        >
          Challenges
        </button>
        <button
          onClick={() => {
            navigate("/account");
          }}
        >
          Account
        </button>
      </header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tidyUser: state.tidyUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logoutRequest,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
