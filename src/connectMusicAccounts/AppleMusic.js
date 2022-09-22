import axios from "axios";
import { useEffect } from "react";
import getToken from "../appleAuth/getToken";
const MusicKit = window.MusicKit;
let count = 0;
function AppleMusicButton() {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get(
      "music-user-token"
    );
    if (code) saveToken(code);
    count++;
    if (count !== 1) return;
  }, []);

  async function connectAppleMusic() {
    const token = await getToken();
    MusicKit.configure({
      developerToken: token,
      app: {
        name: "micxy",
        build: "U23NT233Y6",
      },
    });
    let music = window.MusicKit.getInstance();
    music
      .authorize()
      .then(function (token) {
        // do something with token here
        window.location.href +=
          "?music-user-token=" + encodeURIComponent(token);
      })
      .catch((e) => {
        console.log("Error:" + e);
      });
  }

  function saveToken(code) {
    let playLoad = {
      accountType: "appleMusic",
      token: code,
    };

    axios
      .post("/api/saveAppleMusicToken", playLoad, { withCredentials: true })
      .then((result) => {
        window.location.href = "./home";
      });
  }

  return (
    <div className="button-account">
      <button onClick={connectAppleMusic}>Apple Music Account</button>
    </div>
  );
}

export default AppleMusicButton;
