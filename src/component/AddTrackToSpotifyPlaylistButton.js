import { BsFillPlusCircleFill } from "react-icons/bs";
import { connect } from "react-redux";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";

function AddTrackToSpotifyPlaylistButton(props) {
  const { user, track, playListId } = props;
  const [clickAdd, setClickAdd] = useState(false);
  const addSong = () => {
    let spotify = user.connectedAccounts.find(
      (account) => account.accountType === "spotify"
    );
    let playload = {
      token: spotify.token,
      playlistId: playListId,
      trackUri: track.uri,
    };
    setClickAdd(true);
    axios
      .post("/api/add-track-to-spotify-playlist", playload, {
        withCredentials: true,
      })
      .then((response) => {});
  };

  return (
    <>
      <button>
        {!clickAdd ? (
          <BsFillPlusCircleFill onClick={addSong} />
        ) : (
          <AiOutlineCheckCircle />
        )}
      </button>
    </>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps, null)(AddTrackToSpotifyPlaylistButton);
