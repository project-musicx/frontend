import { BsMusicNoteBeamed } from "react-icons/bs";
import TrackSeachSync from "./TrackSeachSync";
// import trackOptionMenu from "./trackOptionMenu";
// import SearchSong from "./SearchSong";
import { IoEllipsisHorizontal } from "react-icons/io5";
function HeadSpaceSync({
  currentPlayingTrack,
  queueTrack,
  setQueueTrack,
  setCurrentPlayingTrack,
}) {
  return (
    <div className="header-track">
      <TrackSeachSync
        setCurrentPlayingTrack={setCurrentPlayingTrack}
        queueTrack={queueTrack}
        setQueueTrack={setQueueTrack}
      />

      <div className="wrapper-box">
        <div className="image-preview">
          {currentPlayingTrack?.albumUrl?.length ? (
            <img src={currentPlayingTrack?.albumUrl} />
          ) : (
            <div className="icone-image">
              <BsMusicNoteBeamed />
            </div>
          )}
        </div>
        <div className="playlist-detail">
          <p className="playlist-detail-title">
            {currentPlayingTrack.title
              ? currentPlayingTrack.title
              : "Track Name"}
          </p>
          <p className="playlist-description">
            {currentPlayingTrack.albumName
              ? currentPlayingTrack.albumName
              : "Artist Name"}
          </p>
        </div>
        <div className="kfket"></div>
      </div>
      <div className="image-backgroup">
        {currentPlayingTrack?.albumUrl?.length ? (
          <img src={currentPlayingTrack?.albumUrl} />
        ) : (
          <div className="icone-image">
            <BsMusicNoteBeamed />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeadSpaceSync;
