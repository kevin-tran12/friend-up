const GET_EVENTS = "events/GET_EVENTS";
const GET_USER_EVENTS = "events/GET_USER_EVENTS";
const getEvents = (events) => ({
  type:GET_EVENTS,
  events:events,
});

const getUserEvents = (userEvents) =>({
  type: GET_USER_EVENTS,
  userEvents:userEvents,
})

export const createEvent = (name, category, description, location, city, date, userId) => async (dispatch) => {
  const when = date.toString()
  const res = await fetch("api/events/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      category,
      location,
      city,
      when,
      userId
    }),
  });
  if(res.ok) return dispatch(loadAllEvents())
};

export const loadAllEvents = () => async (dispatch) => {
  const res = await fetch("/api/events/");

  if (!res.ok) return;
  const data = await res.json();
  
  dispatch(getEvents(data));

  return data;
};

export const loadUserEvents = (userId) => async (dispatch) =>{
  const res = await fetch (`/api/users/events/${Number(userId)}`)
  if(!res.ok) return

  const data = await res.json()
  dispatch(getUserEvents(data))
  
  return data
}

export const removeEvent = (id,userId) => async (dispatch) =>{
  const res = await fetch(`/api/events/delete/${Number(id)}`,{
    method: 'DELETE',
    headers:{
      "Content-Type": "application/json",
    },
  });
  if(res.ok) return dispatch(loadUserEvents(userId))
}

export const updateEvent = (name, category, description, location, city, date, userId,id) => async (dispatch) => {
  const when = date.toString()
  const res = await fetch(`/api/events/update/${Number(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      category,
      location,
      city,
      when,
      userId
    }),
  });
  if(res.ok) return dispatch(loadUserEvents(userId))
};
export default function eventReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case GET_EVENTS:
      newState = { ...state };
      action.events.event.forEach((event) => {
        newState[event["id"]] = event;
      });
      return newState;
    case GET_USER_EVENTS:
      newState={}
      action.userEvents.userEvents.forEach(userEvent =>{
        newState[userEvent['id']]= userEvent
      })
      return newState;

    default:
        return state;
  }
}
