import { AiOutlineHome } from "react-icons/ai";
import moment from "moment";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoEllipsisHorizontal, IoCopy } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
function SyncTrack({ track, index, updateCurrentTrack, currentPlayingTrack }) {
  return (
    <div
      onClick={() => {
        updateCurrentTrack(track);
      }}
      key={track.uri}
      className={`box-song sync ${
        currentPlayingTrack.uri === track.uri ? "current-playing-song" : ""
      }`}
    >
      <div className="track-icon">
        {track.albumUrl ? (
          <img src={track.albumUrl} />
        ) : (
          <div className="icone-image">
            <BsMusicNoteBeamed />
          </div>
        )}
      </div>
      <div className="track-details">
        <div className="singer-name">{track.artist}</div>
        <div className="song-title">{track.title}</div>
        <div></div>
      </div>
      <button className="track-menu-button">
        <IoEllipsisHorizontal />
      </button>
    </div>
  );
}

export default SyncTrack;
