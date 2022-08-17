import Track from "./track";
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
function PlaylistTable(props) {
  const { id, user, Alltrack, updateMyTrack } = props;
  let spotify = user?.connectedAccounts.find(
    (account) => account.accountType === "spotify"
  );
  let token = spotify?.token;
  const [tracks, setTracks] = useState([]);

  function getPlayListTrack() {
    axios
      .get(`/api/my-playlist-track/${id}/${token}`)
      .then((result) => {
        Alltrack[id] = result.data;
        updateMyTrack(Alltrack);
        setTracks(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (id && token) {
      let currentTrack = Alltrack[id];
      if (currentTrack) {
        setTracks(currentTrack);
      } else {
        if (token) getPlayListTrack();
      }
    }
  }, [token, id]);

  return (
    <div className="wrapper-playlist">
      <section className="table-playlist">
        <div className="header-table">#</div>
        <div className="header-table">Title</div>
        <div className="header-table">Album</div>
        <div className="header-table">Date Added</div>
        <div className="header-table">TIME</div>
      </section>
      <main className="table-track">
        {tracks?.map((item, index) => {
          return <Track track={item} index={index} key={item.id} />;
        })}
      </main>
    </div>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
    myPlaylist: state.myPlaylist,
    Alltrack: state.track,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateMyTrack: (data) => {
      dispatch({ type: "UPDATE_PLAYLIST_TRACK", data: data });
    },
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(PlaylistTable);
