import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadUserEvents, removeEvent, updateEvent } from "../../store/event";
import DatePicker from "react-datepicker";

export default function EventPage() {
  const userId = useParams();
  const dispatch = useDispatch();
  const sessUser = useSelector((state) => state.session.user.id);
  const events = useSelector((state) => Object.values(state.event));
  const eventId = useSelector(state => state.event)
  const [form, setForm] = useState(false);
  const closeForm = () => setForm(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Night Life");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());

  const openForm = (e) => {
    setForm(true);
    const props = eventId[e.target.value]
    setName(props.name)
    setCategory(props.category)
    setCity(props.city)
    setLocation(props.location)
    setDate(new Date(props.when))
    setDescription(props.description)
    setId(props.id)
  };


  useEffect(() => {
    dispatch(loadUserEvents(Object.values(userId)[0]));
  }, [dispatch, userId]);
  const deleteItem = (e) => {
    e.preventDefault();
    dispatch(removeEvent(e.target.value, sessUser));
  };
  const editEvent = (e) => {
    e.preventDefault();
    closeForm();
    dispatch(updateEvent(name, category, description, location, city, date, Object.values(userId)[0],id))
  };

  return (
    <>
      <div className="Event">
        <h1>Events</h1>
        {events &&
          events.map((event) => (
            <div className="event-container">
              <h2>{event.name}</h2>
              {sessUser == userId.userId && (
                <div>
                  <button value={event.id} onClick={deleteItem}>
                    Cancel Event
                  </button>
                  <button value={event.id} onClick={openForm}>Edit Event</button>
                  {form && (
                    <div className='modal'>
                      <button id="close" onClick={() => setForm(false)}>
                        X
                      </button>
                      <form className="eventForm" onSubmit={editEvent}>
                        <h1>Create An Event</h1>
                        <div>
                          <label>
                            Name:
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required={true}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Brief Description:
                            <input
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required={true}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Category:
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              required={true}
                            >
                              <option value="Night Life">Night Life</option>
                              <option value="Sports">Sports</option>
                              <option value="Food">Food</option>
                              <option value="Chat">Chat</option>
                              <option value="Games">Games</option>
                              <option value="Chill">Chill</option>
                            </select>
                          </label>
                        </div>
                        <div>
                          <label>
                            Location:
                            <input
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              required={true}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            City:
                            <input
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required={true}
                            />
                          </label>
                        </div>
                        <div>
                          <label>
                            Date:
                            <div>
                              <DatePicker
                                className='react-datepicker'
                                selected={date}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mmaa"
                                onChange={(date) => setDate(date)}
                                />
                            </div>
                          </label>
                        </div>
                        <button className="button" type="submit">
                          Update
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
              {!form && (
                <div>
                  <div>Description: {event.description}</div>
                  <div>Category: {event.category}</div>
                  <div>City: {event.city}</div>
                  <div>Location: {event.location}</div>
                  <div>Date and Time: {event.when.slice(0, 24)}</div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}
