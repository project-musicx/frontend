import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
function LoadAccount() {
  return <div className="load-that-nav"></div>;
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapstateToProps, null)(LoadAccount);
