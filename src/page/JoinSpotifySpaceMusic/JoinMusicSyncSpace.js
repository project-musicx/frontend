import SyncPlayer from "./SyncPlayer";
import { useEffect, useState } from "react";
import axios from "axios";
import RenderManageAndSyncTrack from "./RenderManageAndSyncTrack";
import HeadSpaceSync from "./HeadSpaceSync";
import ConnectedPeople from "./connectedPeople";
import { useParams } from "react-router-dom";

import socket from "socketConfig";
function JoinMusicSyncSpace() {
  const { id } = useParams();
  const [queueTrack, setQueueTrack] = useState([]);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState({});
  const [load, setLoad] = useState(false);

  function updateCurrentTrack(track) {
    setCurrentPlayingTrack(track);
  }
  function beginPlayingSong() {}
  useEffect(() => {
    axios.get(`/api/connect-to-musicsyncspace/${id}`).then((result) => {
      if (result.data.musicsyncspace) {
        setLoad(true);
      }
    });
  }, [id]);

  return (
    <div className="musicSyncSpace">
      {load ? (
        <div className="wraper-music-space">
          <HeadSpaceSync
            room={id}
            currentPlayingTrack={currentPlayingTrack}
            updateCurrentTrack={updateCurrentTrack}
            setCurrentPlayingTrack={setCurrentPlayingTrack}
            queueTrack={queueTrack}
            setQueueTrack={setQueueTrack}
          />
          <div className="container-sync">
            <div className="playlist-queue-wrapper">
              <RenderManageAndSyncTrack
                room={id}
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
              room={id}
              beginPlayingSong={beginPlayingSong}
              queueTrack={queueTrack}
              currentPlayingTrack={currentPlayingTrack}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <ConnectedPeople />
    </div>
  );
}

export default JoinMusicSyncSpace;
