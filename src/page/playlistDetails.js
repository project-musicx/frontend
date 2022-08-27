import { useState, useEffect } from "react";
import PlaylistHeaderDetails from "../component/playlistHeaderDetails";
import EditPlalist from "../component/editPlaylist";
import PlaylistTable from "../component/playlistTable";
import axios from "axios";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
function PlaylistDetails() {
  const [playList, setPlaylist] = useState(null);
  const [updatePlayListCounter, setUpdatePlayListCounter] = useState(0);
  const { id } = useParams();

  function getPlayListDetail() {
    axios
      .get(`/api/my-playlist/${id}`)
      .then((result) => {
        setPlaylist(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getPlayListDetail();
  }, [id]);
  return (
    <div className="home">
      {playList ? (
        <PlaylistHeaderDetails
          updatePlayListCounter={updatePlayListCounter}
          setUpdatePlayListCounter={setUpdatePlayListCounter}
          playList={playList}
        />
      ) : (
        ""
      )}
      <div className="tabs-section">
        <PlaylistTable
          updatePlayListCounter={updatePlayListCounter}
          id={playList?.playListId}
        />
      </div>
    </div>
  );
}

export default PlaylistDetails;
