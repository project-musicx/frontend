import "./App.css";
import "./style/main.css";
import Login from "./component/login";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from "./component/nav";
import axios from "axios";
import Landing from "./page/LandingPage";
import MusicSyncSpace from "./page/SpotifySpaceMusic/MusicSyncSpace";
import PlaylistDetails from "./page/playlistDetails";
import JoinMusicSyncSpace from "./page/JoinSpotifySpaceMusic/JoinMusicSyncSpace";
import socket from "./socketConfig";
import Home from "./page/home";
function App(props) {
  const navigate = useNavigate();
  function logout() {
    axios
      .post("/api/auth/logout", { withCredentials: true })
      .then((response) => {});
  }
  function checkLogin() {
    axios
      .post("/api/auth/check-login", { withCredentials: true })
      .then((res) => {
        if (res.data.succes) {
          let userId = res.data.payload._id;
          socket.auth = { userId };
          socket.connect();
          props.loginAthification(res.data.payload);
          setLogin(true);
        } else {
          navigate("/");
        }
        setchecking(true);
      });
  }

  const [isLogin, setLogin] = useState(false);
  const [checking, setchecking] = useState(false);
  useEffect(() => {
    // logout()
    checkLogin();
    // setTimeout(() => {
    //   checkLogin();
    // },2000)
  }, []);

  return checking ? (
    isLogin ? (
      <div className="App">
        <Nav />
        <div className="wrapper-div">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/playlist/:id" element={<PlaylistDetails />} />
            <Route path="/musicsyncspace" element={<MusicSyncSpace />} />
            <Route
              path="/musicsyncspace/:id"
              element={<JoinMusicSyncSpace />}
            />
          </Routes>
        </div>
      </div>
    ) : (
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    )
  ) : (
    ""
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    loginAthification: (data) => {
      dispatch({ type: "USER", data: data });
    },
  };
};
const mapstateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(App);
