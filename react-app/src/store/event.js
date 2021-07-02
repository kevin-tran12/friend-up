const GET_EVENTS = "events/GET_EVENTS";

const getEvents = (events) => ({
  type:GET_EVENTS,
  events:events,
});

export const createEvent = (name, description, category, location, city, date, time ) => async () => {
//   const { name, description, category, location, city, date, time } = payload;
//   const dateParsed= date.slice(5,15)

  console.log(date.year)
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
      date,
      time,
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
    console.log(action)
  switch (action.type) {
    case GET_EVENTS:
      newState = { ...state };
      action.events.events.forEach((event) => {
        newState[event["id"]] = event;
      });
      return newState;
    default:
        return state;
  }
}
