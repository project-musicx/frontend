import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsMusicNoteBeamed } from "react-icons/bs";
import useInterval from "../../hooks/useInterval";
import Slider from "./Slider";
let interval;
let currentSecond = 0;
const SpotifyWebApi = require("spotify-web-api-node");
function SyncPlayer(props) {
  const { user, currentPlayingTrack, beginPlayingSong } = props;
  const [timer, setTime] = useState(Date.now());
  const spotifyApi = new SpotifyWebApi();
  const account = user?.connectedAccounts.find(
    (account) => account.accountType === "spotify"
  );

  const formatDuration = (milliseconds = currentSecond) => {
    var minutes = Math.floor(milliseconds / 60000);
    var seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  spotifyApi.setAccessToken(account?.token);
  const [isPlaying, setIsPlaying] = useState(false);

  function converToWidth() {
    var seconds = (currentPlayingTrack.duration_ms / 1000).toFixed(0);
    let percentage = Math.floor((currentSecond / seconds) * 100);
    return percentage;
  }

  function debounce(callback, delay, immediate = false) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      const shouldCall = timerId == null && immediate;
      if (shouldCall) {
        callback.apply(this, args);
      }

      timerId = setTimeout(() => {
        if (!immediate) {
          callback.apply(this, args);
        }
        timerId = null;
      }, delay);
    };
  }

  function pause() {
    spotifyApi.pause().then(
      function () {
        clearInterval(interval);
        setIsPlaying(false);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }
  function UpdateSlider() {
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      ++currentSecond;
      setTime(currentSecond);
    }, 1000);
  }

  useEffect(() => {
    playSong();
    clearInterval(interval);
    currentSecond = 0;
  }, [currentPlayingTrack.uri]);
  useEffect(() => {
    if (converToWidth() === 100) {
      clearInterval(interval);
      currentSecond = 0;
      UpdateSlider();
    }
  });
  function playSong() {
    let songQueue = [currentPlayingTrack.uri];
    spotifyApi.play({ uris: songQueue }).then(
      function () {
        UpdateSlider();
        beginPlayingSong();
        setIsPlaying(true);
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
  }
  return (
    <div className="spotify-box-player">
      <div className="container-player">
        <div className="wrapper-music-playing">
          <div className="player-cirlce">
            {currentPlayingTrack.albumUrl ? (
              <img src={currentPlayingTrack.albumUrl} />
            ) : (
              <div className="icone-image">
                <BsMusicNoteBeamed />
              </div>
            )}
          </div>
          <div className="track-info">
            <div className="current-track-singer">
              {currentPlayingTrack.artist}
            </div>
            <div className="curr-track-name">{currentPlayingTrack.title}</div>
          </div>
        </div>
        <div className="timer-player">
          {!isPlaying ? (
            <div onClick={playSong} className="track-player">
              <FaPlay />
            </div>
          ) : (
            <div onClick={pause} className="track-player">
              <FaPause />
            </div>
          )}
        </div>
        <div className="timer-slider">
          <div className="current-timer">
            {" "}
            {formatDuration(Math.floor(currentSecond * 1000))}
          </div>
          <Slider
            currentSecond={currentSecond}
            currentPlayingTrack={currentPlayingTrack}
          />
          <div className="current-timer">
            {formatDuration(currentPlayingTrack.duration_ms)}
          </div>
        </div>
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
export default connect(mapstateToProps, null)(SyncPlayer);
