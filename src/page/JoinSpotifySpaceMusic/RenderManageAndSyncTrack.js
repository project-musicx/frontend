import SyncTrack from "./SyncTrack";
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import TrackSeachSync from "./TrackSeachSync";
import socket from "socketConfig";
let count = 0;
function RenderManageAndSyncTrack(props) {
  const {
    currentPlayingTrack,
    setCurrentPlayingTrack,
    queueTrack,
    setQueueTrack,
    updateCurrentTrack,
    room,
    user,
  } = props;

  useEffect(() => {
    retriveSongQueue();
    realTimeMusicSpaceMessage();
  }, []);
  function retriveSongQueue() {
    axios.get(`/api/retrieve-this-room-queue/${room}`).then((result) => {
      setQueueTrack(result.data);
      syncTrack();
    });
  }
  function syncTrack() {
    socket.emit("sync-with-this-space", { room: room, userId: user._id });
  }

  function realTimeMusicSpaceMessage() {
    if (count) return;
    count++;
    socket.on("current-playing-track", (data) => {
      console.log(data);
    });
    socket.on("you-are-connected-to-this-space", (data) => {
      console.log(data);
    });
  }

  return (
    <div className="wrapper-playlist-wraper">
      <div className="wrpaer-queue">
        <p className="title-queue">Playlist Queue</p>
        <main className="table-track">
          {queueTrack?.map((item, index) => {
            return (
              <SyncTrack
                currentPlayingTrack={currentPlayingTrack}
                updateCurrentTrack={updateCurrentTrack}
                track={item}
                index={index}
                key={index}
              />
            );
          })}
        </main>
        {queueTrack.length === 0 ? <main className="table-track"></main> : ""}
      </div>
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
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(RenderManageAndSyncTrack);
