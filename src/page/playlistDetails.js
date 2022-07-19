import { useState, useEffect } from "react";
import PlaylistHeaderDetails from "../component/playlistHeaderDetails";
import PlaylistTable from "../component/playlistTable";
import axios from "axios";
import { useParams } from "react-router-dom";
function PlaylistDetails() {
  const [playList, setPlaylist] = useState(null);
  const [tracks, setTrack] = useState(null);
  const { id } = useParams();
  function getPlayListDetail() {
    axios
      .get(`http://localhost:5000/my-playlist/${id}`)
      .then((result) => {
        setPlaylist(result.data.currentPlayList);

        result.data.track.sort((a, b) => b.popularity - a.popularity);
        setTrack(result.data.track);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getPlayListDetail();
  },[id]);
  return (
    <div className="home">
      {playList ? <PlaylistHeaderDetails playList={playList} /> : ""}
      <div className="tabs-section">
        {tracks ? <PlaylistTable tracks={tracks} /> : ""}
      </div>
    </div>
  );
}

export default PlaylistDetails;
