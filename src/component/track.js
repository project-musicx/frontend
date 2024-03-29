import { AiOutlineHome } from "react-icons/ai";
import moment from "moment";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoEllipsisHorizontal, IoCopy } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
function Track({ track, index }) {
  const formatDuration = (milliseconds) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div className="tack-table">
      <div className="header-table">{index + 1}</div>
      <div className="header-table">
        <div id="wrapert-preview">
          <div className="preview-siong-image">
            {track.albumUrl ? (
              <img src={track.albumUrl} />
            ) : (
              <div className="icone-image">
                <BsMusicNoteBeamed />
              </div>
            )}
          </div>
          <div className="title-desctip">{track.title}</div>
        </div>
      </div>
      <div className="header-table">{track.albumName}</div>
      <div className="header-table">
        {moment(track.release_date).format("MMM Do YY")}
      </div>
      <div className="header-table last">
        <p className="time-of-track">{formatDuration(track.duration_ms)}</p>
        <button className="track-menu-button">
          <IoEllipsisHorizontal />
        </button>
      </div>
    </div>
  );
}

export default Track;
