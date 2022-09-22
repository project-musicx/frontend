import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
function SpotifyPlaylistNames(props) {
  const { user } = props;
  const [myPlaylist, setPlaylist] = useState([]);
  function getPlayList() {
    axios
      .get("/api/my-playlist")
      .then((result) => {
        props.updatePlayList(result.data);
        setPlaylist(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    if (user && props.user.connectedAccounts.length) {
      getPlayList();
    }
  }, [user]);
  return (
    <div className="wrapper-playlistName">
      {myPlaylist?.map((item) => (
        <NavLink
          to={`/playlist/${item.id}`}
          key={item.id}
          className="box-name-playlist"
        >
          {item.playlistName}
        </NavLink>
      ))}
    </div>
  );
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePlayList: (data) => {
      dispatch({ type: "UPDATE_PLAYLIST", data: data });
    },
  };
};
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(SpotifyPlaylistNames);
