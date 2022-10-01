import { useState, useEffect } from "react";
import axios from "axios";
import SpotifyButton from "../connectMusicAccounts/spotifyButton";
// import AppleMusicButton from "../connectMusicAccounts/AppleMusic";
function ConnectAccount(props) {
  const { type, user } = props;
  const [loadMenu, setLoadMenu] = useState(false);
  const account = user?.connectedAccounts.find(
    (account) => account.accountType === type
  );
  useEffect(() => {
    if (!account) {
      setLoadMenu(true);
    } else {
      setLoadMenu(false);
    }
  }, [account]);

  return loadMenu ? (
    <div className="connection-account-wrapper">
      <div className="connection-box">
        <div className="header-har">
          {/* <div className="close-that">
          <IoCloseSharp />
        </div> */}
          <div className="title-that">Link your {type}</div>
        </div>
        <div className="wrapper-for-link">
          {type === "spotify" ? <SpotifyButton /> : ""}
          {/* {type === "appleMusic" ? <AppleMusicButton /> : ""} */}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ConnectAccount;
