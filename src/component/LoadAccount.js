import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import LoadAccount from "./playlistNames";
function Nav() {
  return <div className="load-that-nav"></div>;
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapstateToProps, null)(LoadAccount);
