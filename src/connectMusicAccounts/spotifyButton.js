import axios from "axios";
import { useState, useEffect } from "react";

function SpotifyButton() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      saveToken();
    }
    function saveToken() {
      let playLoad = {
        accountType: "spotify",
        token: token,
      };
      axios
        .post("/api/save-my-token", playLoad, { withCredentials: true })
        .then((result) => {
          console.log("redirect");
        });
    }
    setToken(token);
  }, []);

  return (
    <div className="button-account">
      <button>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Spotify Account
        </a>
      </button>
    </div>
  );
}

export default SpotifyButton;
