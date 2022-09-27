import SyncPlayer from "./SyncPlayer";
import { useEffect, useState } from "react";
import RenderManageAndSyncTrack from "./RenderManageAndSyncTrack";
function MusicSyncSpace() {
  const [queueTrack, setQueueTrack] = useState([]);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState({});

  function updateCurrentTrack(track) {
    setCurrentPlayingTrack(track);
  }
  function beginPlayingSong() {}
  return (
    <div className="wrapperjj-sync">
      <div className="titler-room-banner"></div>
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
  );
}

export default MusicSyncSpace;
