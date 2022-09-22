import { AiOutlineHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import LoadAccount from "./LoadAccount";
import SpotifyPlaylistNames from "./SpotifyPlaylistNames";
import AppleMusicPlaylistNames from "./AppleMusicPlaylistNames";

function Nav({ playlist }) {
  return (
    <div className="side-nav">
      <div className="title-of-the-product">MICXY</div>
      <LoadAccount />
      <div className="navigation-section">
        <div className="section-nav">
          <NavLink to="/home" className="box-tabs-nav">
            <div className="box-icon">
              {" "}
              <AiOutlineHome />
            </div>
            <p>Home</p>
          </NavLink>
          <div className="render-my-play-list">
            {/* <p className="title-ofbox">Playlists</p> */}
            <SpotifyPlaylistNames />
            <AppleMusicPlaylistNames />
          </div>
        </div>
        <div className="log-out">
          <div className="box-tabs-nav">
            <div className="box-icon">
              {" "}
              <BiLogOut />
            </div>
            <div>Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps, null)(Nav);
