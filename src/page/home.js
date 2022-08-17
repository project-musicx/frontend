import { useState, useEffect } from "react";
import PlaylistBox from "../component/playlistBox";
import { connect } from "react-redux";
import ConnectAccount from "../component/connectAccount";
import axios from "axios";
function Home(props) {
  const { user } = props;
  const [currentTab, setCurrentTab] = useState("spotify");
  return (
    <div className="home">
      <div className="header-profile">
        <p>Home</p>
      </div>
      <div className="tabs-section">
        <div className="tabs-wrapper">
          <button
            onClick={() => {
              setCurrentTab("spotify");
            }}
            className={`sporify-tab ${
              currentTab === "spotify" ? "active" : ""
            }`}
          >
            Spotify
          </button>
          <button
            onClick={() => {
              setCurrentTab("appleMusic");
            }}
            className={`apple-tab ${
              currentTab === "appleMusic" ? "active" : ""
            }`}
          >
            Apple Music
          </button>
        </div>

        <ConnectAccount user={props.user} type={currentTab} />
        {currentTab === "spotify" ? (
          <div className="playlist-section">
            {props.myPlaylist?.map((item) => {
              return <PlaylistBox playlist={item} key={item._id} />;
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
    myPlaylist: state.myPlaylist,
  };
};
export default connect(mapstateToProps, null)(Home);
