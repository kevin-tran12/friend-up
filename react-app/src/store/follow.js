const GET_FOLLOW = 'following/GET_FOLLOW'
const REMOVE_FOLLOW = 'following/REMOVE_FOLLOW'
const CLEAR_STATE = 'following/CLEAR_STATE'

const getFollow = (follows) =>({
    type: GET_FOLLOW,
    follow:follows
})

const removeFollow = (follows) =>({
  type: REMOVE_FOLLOW,
  follow: follows
})

export const clearFollow =() =>({
  type:CLEAR_STATE,
})

export const loadAllFollow = (id) => async (dispatch) => {
    const res = await fetch(`/api/follows/${Number(id)}`,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    });
  
    if (!res.ok) return;
    const data = await res.json();
    dispatch(getFollow(data));

    return data;
  };

export const followUsers = (userId, sessUser) => async (dispatch) => {
  const res = await fetch(`/api/follows/${Number(sessUser)}`, {
    method: "POST",
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     },
    body: JSON.stringify({
      sessUser,
      userId,
    }),
  });

  if(!res.ok) return
  dispatch(loadAllFollow(sessUser));
  
};

export const unfollowUser= (userId, sessUser) => async (dispatch) =>{
  const res = await fetch(`/api/follows/delete/${Number(sessUser)}`,{
    method: 'DELETE',
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     },
    body: JSON.stringify({
      sessUser,
      userId,
    }),
  });
  if(!res.ok) return 
  dispatch(removeFollow(userId));
}

export default function followingReducer(state = {}, action) {
    let newState={}
  switch (action.type) {
    case GET_FOLLOW:
      newState = {...state };
      action.follow.follow.forEach((following) =>{
        newState[following['id']]=following
      })
        return newState;
    case REMOVE_FOLLOW:
     newState={...state}
     delete newState[action.follow]
     return newState
    case CLEAR_STATE:
      return newState
    default:
      return state;
  }
}
