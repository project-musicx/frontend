import Redirect from "../redirect";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../component/TopNav";
function LandingPage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.user) navigate("/home");
  }, [props.user]);

  return (
    <div className="landing-page">
      <TopNav />
    </div>
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

export default connect(mapstateToProps, mapDispatchToProps)(LandingPage);
