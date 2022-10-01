import SyncTrack from "./SyncTrack";
import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import TrackSeachSync from "./TrackSeachSync";
function RenderManageAndSyncTrack(props) {
  const {
    currentPlayingTrack,
    setCurrentPlayingTrack,
    queueTrack,
    setQueueTrack,
    updateCurrentTrack,
  } = props;

  return (
    <div className="wrapper-playlist-wraper">
      {/* <TrackSeachSync queueTrack={queueTrack} setQueueTrack={setQueueTrack} /> */}
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

        <main className="table-track">
          {queueTrack.length===0?<div>
          
          </div>:""}
        </main>

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
