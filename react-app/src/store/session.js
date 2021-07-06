// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const FOLLOW_USER = 'session/FOLLOW_USER';
// action creators
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const followUser = (payload) =>({
  type:FOLLOW_USER,
  follow: payload
})
// thunks

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }
  dispatch(setUser(data));
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setUser(data));
  return {};
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  dispatch(removeUser());
};

export const signUp =
  (username, email, password, age, description) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        age,
        description,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(setUser(data));
    return {};
  };

export const followUsers = (userId,sessUser) => async dispatch =>{
  const res = await fetch(`/api/follows/${sessUser}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessUser,
      userId
    }),
  });
  dispatch(followUser(sessUser,userId))
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case FOLLOW_USER:
      const newState= {...state}
      if(!newState['user'].following)newState['user'].following=(action.follow)
      else newState['user'].following = newState['user'].following+','+(action.follow)
      return newState
    default:
      return state;
  }
}
