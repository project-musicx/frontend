import { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
function ConnectAccount() {
  return (
    <div className="connection-account-wrapper">
      <div className="connection-box">
        <div className="header-har">
          <div className="close-that">
            <IoCloseSharp />
          </div>
          <div className="title-that">Link your account</div>
        </div>
        <div className="wrapper-for-link">
          <button>Spotify Account</button>
          <button>Apple Music</button>
        </div>
      </div>
    </div>
  );
}

export default ConnectAccount;
