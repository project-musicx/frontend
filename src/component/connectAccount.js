import { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import SpotifyButton from "../connectMusicAccounts/spotifyButton";
function ConnectAccount(props) {
  const { type, user } = props;
  const [loadMenu, setLoadMenu] = useState(false);
  const account = user?.connectedAccounts.find(
    (account) => account.accountType === type
  );
  useEffect(() => {
    if (!account) {
      setLoadMenu(true);
    }
  }, []);

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
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ConnectAccount;
