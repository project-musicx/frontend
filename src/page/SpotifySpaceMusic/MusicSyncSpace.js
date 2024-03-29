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
  const [room, setRoom] = useState("");
  function updateCurrentTrack(track) {
    setCurrentPlayingTrack(track);
  }
  function beginPlayingSong() {}
  useEffect(() => {
    axios
      .post("/api/transition-musicsyncspace", { musicsyncspace: true })
      .then((result) => {
        setRoom(result.data.room);
        realTimeMusicSpaceMessage(result.data.room);
        count++;
      });
  }, []);
  function realTimeMusicSpaceMessage(room) {
    if (count) return;
    socket.emit("link-to-my-space", room);
    socket.on("can-i-connect-with-your-space", (room) => {
      socket.emit("yes-connect-to-my-space", {
        room: room,
        currentPlayingTrack: currentPlayingTrack,
      });
    });
  }
  return (
    <div className="musicSyncSpace">
      {room.length ? (
        <div className="wraper-music-space">
          <HeadSpaceSync
            currentPlayingTrack={currentPlayingTrack}
            updateCurrentTrack={updateCurrentTrack}
            setCurrentPlayingTrack={setCurrentPlayingTrack}
            queueTrack={queueTrack}
            room={room}
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
      ) : (
        ""
      )}

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
