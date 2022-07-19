import "./App.css";
import "./style/main.css";
import Login from "./component/login";
import { BrowserRouter, Routes, Route,Router } from "react-router-dom";
import Nav from "./component/nav";
import PlaylistDetails from "./page/playlistDetails";
import { useState } from "react";
import Home from "./page/home";
function App() {
  const [isLogin, setLogin] = useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <div className="wrapper-div">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/playlist/:id" element={<PlaylistDetails />} />
          </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
