
import { useState, useEffect } from "react";
import {NavLink} from "react-router-dom"
import axios from "axios";
function PlaylistNames() {
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
    <div className="wrapper-playlistName">
     {myPlaylist?.map((item)=><NavLink  to={`/playlist/${item.id}`} key={item.id} className="box-name-playlist">{item.name}</NavLink> )}
    </div>
  );
}

export default PlaylistNames;
