const initState = {
  user: {},
  playlists: [],
};
const rootReducer = (state = initState, action) => {
  if (action.type === "USER") {
    return {
      ...state,
      user: action.user,
    };
  }

  if (action.type === "UPDATE_MY_PLAYLIST") {
    return {
      ...state,
      playlists: action.playlists,
    };
  }

  return state;
};

export default rootReducer;
