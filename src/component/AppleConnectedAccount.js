import ConnectAccount from "./connectAccount";
import { connect } from "react-redux";
import PlaylistBox from "./playlistBox";

function AppleConnectedAccount(props) {
  return (
    <div className="component-wrapper">
      <div className="title-of-wrapper">Apple Music Playlist</div>
      <div className="wrapper-playlist">
        <ConnectAccount user={props.user} type={"appleMusic"} />
        <div className="playlist-section"></div>
      </div>
    </div>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
    myPlaylist: state.myPlaylist,
  };
};
export default connect(mapstateToProps, null)(AppleConnectedAccount);
