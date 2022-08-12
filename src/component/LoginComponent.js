import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function LoginComponent() {
  let navigate = useNavigate();
  function handleCallBackResponse(response) {
    var user_object = jwt_decode(response.credential);
    loginWithGoogle(user_object)
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

  function loginWithGoogle(user_object) {
    axios.post("/api/auth/login", user_object ,{ withCredentials: true }).then((result) => {
      navigate("./home", { replace: true });
    });
  }

  return (
    <div className="login-box">
      <div className="login-component">
        <div className="title-of-compoent">Login To Micxy</div>
        <div id="sign-in"></div>
      </div>
    </div>
  );
}
export default LoginComponent;
