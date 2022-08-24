import { connect } from "react-redux";
import SpotifyConnectedAccount from "../component/SpotifyConnectedAccount";
function Home(props) {
  const { user } = props;
  return (
    <div className="home">
      <div className="header-profile">
        <p>Home</p>
      </div>
      <div className="tabs-section">
        <SpotifyConnectedAccount user={props.user} />
      </div>
    </div>
  );
}
const mapstateToProps = (state) => {
  return {
    user: state.user,
    myPlaylist: state.myPlaylist,
  };
};
export default connect(mapstateToProps, null)(Home);
