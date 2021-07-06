const POST_FOLLOW = "following/POST_FOLLOW";
const GET_FOLLOW = 'following/GET_FOLLOW'
const followUser = (payload) => ({
  type: POST_FOLLOW,
  follow: payload,
});

const getFollow = (follows) =>({
    type: GET_FOLLOW,
    follow:follows
})

export const loadAllFollow = (id) => async (dispatch) => {
    const res = await fetch(`/api/follow/${id}`);
  
    if (!res.ok) return;
    const data = await res.json();
    console.log(data)
    dispatch(getFollow(data));
  
    return data;
  };

export const followUsers = (userId, sessUser) => async (dispatch) => {
  const res = await fetch(`/api/follows/${sessUser}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessUser,
      userId,
    }),
  });
  dispatch(followUser(sessUser, userId));
};

const initialState = { user: null };

export default function followingReducer(state = initialState, action) {
    const newState={}
  switch (action.type) {
    case GET_FOLLOW:
        return newState={...state}
    case POST_FOLLOW:
      newState = { ...state };
      if (!newState["user"].following)
        newState["user"].following = action.following;
      else
        newState["user"].following =
          newState["user"].following + "," + action.following;
      return newState;
    default:
      return state;
  }
}
