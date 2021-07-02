const GET_EVENTS = "events/GET_EVENTS";

const getEvents = (events) => ({
  type:GET_EVENTS,
  events:events,
});

export const createEvent = (name, category, description, location, city, date, userId) => async () => {
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
  if(res.ok) return
};

export const loadAllEvents = () => async (dispatch) => {
  const res = await fetch("/api/events/");

  if (!res.ok) return;
  const data = await res.json();
  dispatch(getEvents(data));

  return data;
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
    default:
        return state;
  }
}
