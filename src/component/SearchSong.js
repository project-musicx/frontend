import { AiOutlineSearch } from "react-icons/ai";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
});

function SearchSong(props) {
  const { user } = props;
  const [currentSong, setCurrentSong] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    let spotify = user.connectedAccounts.find(
      (account) => account.accountType === "spotify"
    );
    spotifyApi.setAccessToken(spotify.token);
  }, []);

  useEffect(() => {
    console.log(searchResults);
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
            <div key={track.id} className="box-song">
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
              <button>
                <BsFillPlusCircleFill />
              </button>
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
