import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Link } from "react-router-dom";
function PlaylistBox({ playlist }) {
  return (
    <Link to={`/playlist/${playlist._id}`} className="playlist-box">
      <div className="preview-image">
        {playlist.images.length ? (
          <img src={playlist.images[0].url} />
        ) : (
          <div className="icone-image">
            <BsMusicNoteBeamed />
          </div>
        )}
      </div>
      <div className="playlist-name">
        <p className="title-of-playlist"> {playlist.playlistName}</p>
      </div>
    </Link>
  );
}

export default PlaylistBox;
