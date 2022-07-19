import { BsMusicNoteBeamed } from "react-icons/bs";
import { IoEllipsisHorizontal } from "react-icons/io5";
function PlaylistHeaderDetails({ playList }) {
  return (
    <div className="header-playlist">
    <div className="wrapper-box">
    <div className="image-preview">
        {playList?.images?.length ? (
          <img src={playList.images[0].url} />
        ) : (
          <div className="icone-image">
            <BsMusicNoteBeamed />
          </div>
        )}
      </div>
      <div className="playlist-detail">
        <p className="playlist-detail-title">{playList.name}</p>
        <p className="playlist-description">{playList.description}</p>
      </div>
      <div className="menu">
        <div className="close-that">
          <IoEllipsisHorizontal />
        </div>
      </div>
    </div>
      <div className="image-backgroup">
      <img src={playList?.images[0]?.url} />
      </div>
    </div>
  );
}

export default PlaylistHeaderDetails;
