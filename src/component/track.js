import { AiOutlineHome } from "react-icons/ai";
import moment from "moment";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
function Track({ track, index }) {
  const date = new Date(track.duration_ms);

  return (
    <div className="tack-table">
      <div className="header-table">{index + 1}</div>
      <div className="header-table">
        <div id="wrapert-preview">
          <div className="preview-siong-image">
            {track.album.images.length ? (
              <img src={track.album.images[0].url} />
            ) : (
              <div className="icone-image">
                <BsMusicNoteBeamed />
              </div>
            )}
          </div>
          <div className="title-desctip">{track.name}</div>
        </div>
      </div>
      <div className="header-table">{track.album.name}</div>
      <div className="header-table">
        {moment(track.album.release_date).format("MMM Do YY")}
      </div>
      <div className="header-table last">{`${date.getMinutes()}:${date.getSeconds()}`}</div>
    </div>
  );
}

export default Track;
