function Slider(props) {
  const { currentPlayingTrack, currentSecond } = props;
  function converToWidth() {
    var seconds = (currentPlayingTrack.duration_ms / 1000).toFixed(0);
    let percentage = Math.floor((currentSecond / seconds) * 100);
    console.log(currentSecond, percentage);
    return percentage;
  }

  return (
    <div className="track-slider">
      <div className="slider-div">
        <div
          style={{ width: `${converToWidth()}%` }}
          className="progess-bar"
        ></div>
      </div>
    </div>
  );
}

export default Slider;
