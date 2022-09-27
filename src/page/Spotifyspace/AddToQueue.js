import { BsFillPlusCircleFill } from "react-icons/bs";
import { connect } from "react-redux";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
function AddToQueue(props) {
  const {
    user,
    track,
    queueTrack,
    playlistId,
    setUpdatePlayListCounter,
    updatePlayListCounter,
    setQueueTrack,
  } = props;
  const [clickAdd, setClickAdd] = useState(false);
  const [added, setAdded] = useState(false);

  const addSong = () => {
    let currentTracks = queueTrack.slice();
    currentTracks.push(track);
    console.log(currentTracks);
    setQueueTrack(currentTracks);
  };

  return (
    <>
      <button>
        {added ? (
          <AiOutlineCheckCircle />
        ) : !clickAdd ? (
          <BsFillPlusCircleFill onClick={addSong} />
        ) : (
          ""
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

export default connect(mapstateToProps, null)(AddToQueue);
