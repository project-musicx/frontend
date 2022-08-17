import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
function PlaylistNames(props) {
  const { user } = props;
  const [myPlaylist, setPlaylist] = useState([]);
  function getPlayList() {
    axios
      .get("/api/my-playlist")
      .then((result) => {
        props.updatePlayList(result.data);
        setPlaylist(result.data);
        // result.data.track.sort((a, b) => b.popularity - a.popularity);
        // setTrack(result.data.track);
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
          to={`/playlist/${item._id}`}
          key={item._id}
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
export default connect(mapstateToProps, mapDispatchToProps)(PlaylistNames);
