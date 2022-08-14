import axios from "axios";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
function Login() {
  function handleCallBackResponse(response) {
    var user_object = jwt_decode(response.credential);
  }

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id:
        "38238582225-hje5o3llosp9rdeqhr09v57u3jhdpjqq.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("sign-in"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  function loginWithGoogle() {
    axios.post("/api/auth/login", { withCredentials: true }).then((result) => {
      console.log("succes");
    });
  }

  return (
    <div className="login-box">
      <button onClick={loginWithGoogle} type="button" className="login-button">
        Sign in with Google
      </button>
      <div id="sign-in"></div>
    </div>
  );
}

export default Login;
