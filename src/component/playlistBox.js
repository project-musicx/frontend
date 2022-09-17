import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Link } from "react-router-dom";
function PlaylistBox({ playlist }) {
  return (
    <div className="play-list-box-wrapper">
      <Link to={`/playlist/${playlist.id}`} className="playlist-box">
        <div className="preview-image">
          {playlist.images.length ? (
            <img src={playlist.images[0].url} />
          ) : (
            <div className="icone-image">
              <BsMusicNoteBeamed />
            </div>
          )}
        </div>
      </Link>
      <div className="playlist-name">
        <p className="title-of-playlist"> {playlist.playlistName}</p>
      </div>
    </div>
  );
}

export default PlaylistBox;
