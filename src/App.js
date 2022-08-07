import "./App.css";
import "./style/main.css";
import Login from "./component/login";
import { BrowserRouter, Routes, Route,Router } from "react-router-dom";
import Nav from "./component/nav";
import Landing from "./page/LandingPage";
import PlaylistDetails from "./page/playlistDetails";
import { useState } from "react";
import Home from "./page/home";
import Redirect from "./redirect";
console.log(Redirect)
function App() {
  const [isLogin, setLogin] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
      {isLogin?<Nav/>:""}
        <div className="wrapper-div">
            <Routes>
            <Route path="/" element={<Landing/>} />
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
