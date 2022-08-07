import { useState, useEffect } from "react";
import PlaylistBox from "../component/playlistBox";
import Nav from "../component/nav";
import ConnectAccount from "../component/connectAccount";
import axios from "axios";
function Home() {
  const [myPlaylist, setPlaylist] = useState(null);


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
   // getPlayList();
  }, []);
  return (
    <div className="home">
     <div className="header-profile">
      <p>Home</p>
     </div>
      <div className="tabs-section">
      <div className="title-of-tabs">
     Playlist
      </div>
        <div className="tabs-wrapper">
          <button className="sporify-tab active">Spotify</button>
          <button className="apple-tab">Apple Music</button>
        </div>
     {/*   {!myPlaylist?.length?<ConnectAccount type="Spotify"/>:""}*/}
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
