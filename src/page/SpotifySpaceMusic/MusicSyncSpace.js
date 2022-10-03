import SyncPlayer from "./SyncPlayer";
import { useEffect, useState } from "react";
import axios from "axios";
import RenderManageAndSyncTrack from "./RenderManageAndSyncTrack";
import HeadSpaceSync from "./HeadSpaceSync";
import ConnectedPeople from "./connectedPeople";
import { connect } from "react-redux";
import socket from "socketConfig";
let count = 0;
function MusicSyncSpace(props) {
  const { user } = props;
  const [queueTrack, setQueueTrack] = useState([]);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState({});

  function updateCurrentTrack(track) {
    setCurrentPlayingTrack(track);
  }
  function beginPlayingSong() {}
  useEffect(() => {
    axios
      .post("/api/transition-musicsyncspace", { musicsyncspace: true })
      .then((result) => {
        realTimeMusicSpaceMessage();
        count++;
      });
  }, []);
  function realTimeMusicSpaceMessage() {
    if (count) return;
    socket.on("can-i-connect-with-your-space", (userId) => {
      socket.emit("yes-connect-to-my-space", {
        userId: userId,
        spaceId: user._id,
      });
    });
  }
  return (
    <div className="musicSyncSpace">
      <div className="wraper-music-space">
        <HeadSpaceSync
          currentPlayingTrack={currentPlayingTrack}
          updateCurrentTrack={updateCurrentTrack}
          setCurrentPlayingTrack={setCurrentPlayingTrack}
          queueTrack={queueTrack}
          setQueueTrack={setQueueTrack}
        />
        <div className="container-sync">
          <div className="playlist-queue-wrapper">
            <RenderManageAndSyncTrack
              currentPlayingTrack={currentPlayingTrack}
              updateCurrentTrack={updateCurrentTrack}
              queueTrack={queueTrack}
              setQueueTrack={setQueueTrack}
            />
          </div>
          <div className="second-wraper-table"></div>
        </div>
        {currentPlayingTrack.uri ? (
          <SyncPlayer
            beginPlayingSong={beginPlayingSong}
            queueTrack={queueTrack}
            currentPlayingTrack={currentPlayingTrack}
          />
        ) : (
          ""
        )}
      </div>
      <ConnectedPeople />
    </div>
  );
}

const mapstateToProps = (state) => {
  return {
    user: state.user,
    myPlaylist: state.myPlaylist,
  };
};
export default connect(mapstateToProps, null)(MusicSyncSpace);
