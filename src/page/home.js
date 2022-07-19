import { useState, useEffect } from "react";
import PlaylistBox from "../component/playlistBox";
import ConnectAccount from "../component/connectAccount";
import axios from "axios";
function Home() {
  const [myPlaylist, setPlaylist] = useState([]);

  function getPlayList() {
    axios
      .get("http://localhost:5000/my-playlist")
      .then((result) => {
        setPlaylist(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getPlayList();
  }, []);
  return (
    <div className="home">
      <div className="header-profile"></div>
      <div className="tabs-section">
        <div className="tabs-wrapper">
          <div className="sporify-tab active">Spotify</div>
          <div className="apple-tab">Apple Music</div>
        </div>
        <div className="playlist-section">
          {myPlaylist?.map((item) => {
            return <PlaylistBox playlist={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
