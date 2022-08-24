import { BsMusicNoteBeamed } from "react-icons/bs";
import PlayListOptionMenu from "./playListOptionMenu";
import SearchSong from "./SearchSong";
import { IoEllipsisHorizontal } from "react-icons/io5";
function PlaylistHeaderDetails({ playList }) {
  return (
    <div className="header-playlist">
      <SearchSong />
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
          <p className="playlist-detail-title">{playList.playlistName}</p>
          <p className="playlist-description">{playList.description}</p>
        </div>
        <div className="kfket">
          <PlayListOptionMenu
          // handleGroupOpen={this.handleGroupOpen}
          // handleopen={this.handleopen}
          />
        </div>
      </div>
      <div className="image-backgroup">
        <img src={playList?.images[0]?.url} />
      </div>
    </div>
  );
}

export default PlaylistHeaderDetails;
