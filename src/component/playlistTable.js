import Track from "./track";
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
function PlaylistTable(props) {
  const { id, user } = props;
  let spotify = user?.connectedAccounts.find(
    (account) => account.accountType === "spotify"
  );
  let token = spotify?.token;
  const [tracks, setTracks] = useState([]);
  function getPlayListTrack() {
    console.log(token);
    axios
      .get(`/api/my-playlist-track/${id}/${token}`)
      .then((result) => {
        setTracks(result.data);
        // result.data.track.sort((a, b) => b.popularity - a.popularity);
        // setTrack(result.data.track);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (token && id) {
      getPlayListTrack();
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
  };
};

export default connect(mapstateToProps, null)(PlaylistTable);
