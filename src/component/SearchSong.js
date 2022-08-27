import { AiOutlineSearch } from "react-icons/ai";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import AddTrackToSpotifyPlaylistButton from "./AddTrackToSpotifyPlaylistButton";
import { BsMusicNoteBeamed } from "react-icons/bs";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});
function SearchSong(props) {
  const { user, playListId, setUpdatePlayListCounter, updatePlayListCounter } =
    props;
  const [currentSong, setCurrentSong] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    let spotify = user.connectedAccounts.find(
      (account) => account.accountType === "spotify"
    );
    spotifyApi.setAccessToken(spotify.token);
  }, []);

  useEffect(() => {
    if (!currentSong.trim().length) {
      setSearchResults([]);
      return;
    }
    spotifyApi.searchTracks(currentSong).then((res) => {
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            duration_ms: track.duration_ms,
            release_date: track.album.release_date,
            albumName: track.album.name,
          };
        })
      );
    });
  }, [currentSong]);
  return (
    <div className="wrappper-find">
      <div
        className={`seatch-compoent ${searchResults.length ? "active" : ""}`}
      >
        <div className="icon-song-find">
          <AiOutlineSearch />
        </div>
        <input
          type="text"
          onChange={(e) => setCurrentSong(e.target.value)}
          placeholder="Search a song...."
        />
      </div>
      <div
        className={`render-the-song ${searchResults.length ? "active" : ""}`}
      >
        {searchResults?.map((track) => {
          return (
            <div key={track.uri} className="box-song">
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
              <AddTrackToSpotifyPlaylistButton
                setUpdatePlayListCounter={setUpdatePlayListCounter}
                updatePlayListCounter={updatePlayListCounter}
                track={track}
                playListId={playListId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps, null)(SearchSong);
