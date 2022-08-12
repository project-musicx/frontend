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
          {item.name}
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

export default connect(mapstateToProps, null)(PlaylistNames);
