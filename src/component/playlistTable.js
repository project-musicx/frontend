import Track from "./track";
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
function PlaylistTable(props) {
  const { id, user, Alltrack, updateMyTrack, updatePlayListCounter } = props;
  const [tracks, setTracks] = useState([]);
  let spotify = user?.connectedAccounts.find(
    (account) => account.accountType === "spotify"
  );
  let token = spotify?.token;

  function getPlayListTrack() {
    axios.get(`/api/my-playlist-track/${id}/${token}`).then((result) => {
      let filterData = result.data.filter((item) => item);
      let trackData = filterData.map((track) => {
        const smallestAlbumImage = track.album?.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album?.images[0]
        );
        return {
          id: track.id,
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
          duration_ms: track.duration_ms,
          release_date: track.album?.release_date,
          albumName: track.album?.name,
        };
      });
      Alltrack[id] = [trackData];
      updateMyTrack(Alltrack);
      setTracks(trackData);
    });
  }

  useEffect(() => {
    if (id && token) {
      let currentTrack = Alltrack[id];
      if (currentTrack) {
        setTracks(...currentTrack);
      } else {
        if (token) getPlayListTrack();
      }
    }
  }, [token, id, updatePlayListCounter]);

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
          return <Track track={item} index={index} key={index} />;
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
