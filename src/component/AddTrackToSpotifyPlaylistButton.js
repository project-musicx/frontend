import { BsFillPlusCircleFill } from "react-icons/bs";
import { connect } from "react-redux";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import SmalLoadingSpin from "../loadIngSpinner/SmalLoadingSpin";
function AddTrackToSpotifyPlaylistButton(props) {
  const {
    user,
    track,
    playlistId,
    Alltrack,
    updateMyTrack,
    setUpdatePlayListCounter,
    updatePlayListCounter,
  } = props;
  const [clickAdd, setClickAdd] = useState(false);
  const [added, setAdded] = useState(false);
  const addTrack = () => {
    let newList = Alltrack[playlistId];
    newList[0].unshift(track);
    Alltrack[playlistId] = newList;
    updateMyTrack(Alltrack);
    setUpdatePlayListCounter(updatePlayListCounter + 1);
  };
  const addSong = () => {
    let spotify = user.connectedAccounts.find(
      (account) => account.accountType === "spotify"
    );
    let playload = {
      token: spotify.token,
      playlistId: playlistId,
      trackUri: track.uri,
    };
    setClickAdd(true);
    axios
      .post("/api/add-track-to-spotify-playlist", playload, {
        withCredentials: true,
      })
      .then((response) => {
        setAdded(true);
        addTrack();
      });
  };

  return (
    <>
      <button>
        {added ? (
          <AiOutlineCheckCircle />
        ) : !clickAdd ? (
          <BsFillPlusCircleFill onClick={addSong} />
        ) : (
          <SmalLoadingSpin />
        )}
      </button>
    </>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
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
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(AddTrackToSpotifyPlaylistButton);
