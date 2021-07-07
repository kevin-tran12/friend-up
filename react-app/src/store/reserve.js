const GET_RESERVE = 'reserve/GET_RESERVE'
const REMOVE_RESERVE = 'reserve/REMOVE_RESERVE'
const CLEAR_RESERVE = 'reserve/CLEAR_RESERVE'

const getReserves = (reserves) =>({
    type: GET_RESERVE,
    reserve: reserves
})

const removeReserves = (reserves) =>({
  type: REMOVE_RESERVE,
  reserve: reserves
})

export const clearReserves=() =>({
  type:CLEAR_RESERVE,
})


export const loadAllReserves = (id) => async (dispatch) => {
    const res = await fetch(`/api/reserves/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    console.log(data)
    dispatch(getReserves(data));
    return data;
  };

export const reserveEvent = (userId, eventId) => async (dispatch) => {
  console.log('reservingevent', userId)
  const res = await fetch(`/api/reserves/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId,
      userId,
    }),
  });
  if(!res.ok) return
  dispatch(loadAllReserves(Number(userId)));
  
};

export const unreserveEvent = (userId, eventId) => async (dispatch) =>{
  const res = await fetch(`/api/reserves/delete/${userId}`,{
    method: 'DELETE',
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId,
      userId,
    }),
  });
  if(!res.ok) return 
  dispatch(removeReserves(eventId));
}

export default function reserveReducer(state = {}, action) {
    let newState={}
  switch (action.type) {
    case GET_RESERVE:
      console.log(action.reserve.reserve)
      newState = {...state };
      action.reserve.reserve.forEach((reserving) =>{
        newState[reserving['event_id']]=reserving
      })
        return newState;
    case REMOVE_RESERVE:
     newState={...state}
     delete newState[action.reserve]
     return newState
    case CLEAR_RESERVE:
      console.log('clearing')
      return newState
    default:
      return state;
  }
}