import LoginComponent from "./LoginComponent";
import { useState } from "react";

function TopNav() {
  const [openLogin, setopenLogin] = useState(false);
  return (
    <div className="navigation-tabs">
      <p>Micxy</p>
      <button
        onClick={() => {
          setopenLogin(true);
        }}
        className="login-button"
      >
        Log In
      </button>
      {openLogin ? <LoginComponent /> : ""}
    </div>
  );
}
export default TopNav;
