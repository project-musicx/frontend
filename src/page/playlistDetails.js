import { useState, useEffect } from "react";
import PlaylistHeaderDetails from "../component/playlistHeaderDetails";
import EditPlalist from "../component/editPlaylist";
import PlaylistTable from "../component/playlistTable";
import Player from "../component/SpotifyPlayer/Player";
import axios from "axios";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyConfig = require("../utility/config");
function PlaylistDetails(props) {
  const { user } = props;
  let spotify = user.connectedAccounts.find(
    (account) => account.accountType === "spotify"
  );
  const spotifyApi = spotifyConfig(spotify.token);
  const [playList, setPlaylist] = useState(null);
  const [updatePlayListCounter, setUpdatePlayListCounter] = useState(0);
  const { id } = useParams();
  function getPlayListDetail() {
    spotifyApi.getPlaylist(id).then(
      function (data) {
        let playlist = data.body;
        let newpaylist = {
          playlistName: playlist.name,
          createrId: user._id,
          id: playlist.id,
          numberOfsounds: playlist.tracks.total,
          isPrivate: true,
          platform: "spotify",
          collaborative: false,
          playListUrl: playlist.external_urls.spotify,
          description: playlist.description,
          images: playlist.images,
        };
        setPlaylist(newpaylist);
      },
      function (err) {
        if (err)
          if (err.body.error.message === "The access token expired") {
            axios.get(`/api/refresh-token`).then((response) => {
              getPlayListDetail();
            });
          }
      }
    );
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
          id={playList?.id}
        />
      </div>
      {/* <Player/> */}
    </div>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
    myPlaylist: state.myPlaylist,
  };
};
export default connect(mapstateToProps, null)(PlaylistDetails);
