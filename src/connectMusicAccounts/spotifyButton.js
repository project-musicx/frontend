import axios from "axios";
import { useEffect } from "react";
let count = 0;
function SpotifyButton() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20ugc-image-upload%20user-read-currently-playing%20app-remote-control%20playlist-read-collaborative%20playlist-modify-public%20playlist-read-private%20user-top-read%20playlist-modify-private%20user-read-playback-position%20user-read-recently-played%20user-follow-read%20user-follow-modify`;

  useEffect(() => {
    count++;
    if (count !== 1) return;
    const code = new URLSearchParams(window.location.search).get("code");
    if (code !== null) saveToken();
    function saveToken() {
      let playLoad = {
        accountType: "spotify",
        code: code,
      };
      axios
        .post("/api/save-my-token", playLoad, { withCredentials: true })
        .then((result) => {
          window.location.href = "./home";
        });
    }
  }, []);

  return (
    <div className="button-account">
      <button>
        <a href={AUTH_URL}>Spotify Music Account</a>
      </button>
    </div>
  );
}

export default SpotifyButton;
