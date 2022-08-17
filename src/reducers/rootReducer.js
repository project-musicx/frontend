const initState = {
  user: null,
  myPlaylist: [],
  track: {},
};
const rootReducer = (state = initState, action) => {
  if (action.type === "USER") {
    return {
      ...state,
      user: action.data,
    };
  }

  if (action.type === "UPDATE_PLAYLIST") {
    return {
      ...state,
      myPlaylist: action.data,
    };
  }

  if (action.type === "UPDATE_PLAYLIST_TRACK") {
    return {
      ...state,
      track: action.data,
    };
  }

  return state;
};

export default rootReducer;
