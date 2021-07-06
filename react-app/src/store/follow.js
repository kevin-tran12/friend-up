const GET_FOLLOW = 'following/GET_FOLLOW'


const getFollow = (follows) =>({
    type: GET_FOLLOW,
    follow:follows
})

export const loadAllFollow = (id) => async (dispatch) => {
    const res = await fetch(`/api/follows/${id}`);
  
    if (!res.ok) return;
    const data = await res.json();
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

  if(!res.ok) return
    dispatch(loadAllFollow(Number(sessUser)));
  
};

export const unfollowUser= (userId, sessUser) => async (dispatch) =>{
  const res = await fetch(`/api/follows/delete/${Number(sessUser)}`,{
    method: 'DELETE',
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessUser,
      userId,
    }),
  });

  if(res.ok) return dispatch(loadAllFollow(sessUser));
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
    default:
      return state;
  }
}
