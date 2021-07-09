import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';

import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../store/event";

export default function EventForm(props) {
  const { closeForm } = props;
  const dispatch = useDispatch();
  const dayte = moment()
  const nextDay = moment((dayte).add(1,'days'))

  const [name, setName] = useState("");
  const [category, setCategory] = useState('Night Life');
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date(nextDay));
  const userId = useSelector((state) => state.session.user.id);

  const create = async (e) => {
    e.preventDefault();
    closeForm();
    dispatch(
      createEvent(name, category, description, location, city, date, userId)
    );

  };
  return (
    <>
      <form className="eventForm" onSubmit={create}>
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
            <div className='dates'>
              <DatePicker wrapperClassName='datepicker'
              selected={date}
              showTimeSelect
              minDate={new Date(nextDay)}
              dateFormat="MMMM d, yyyy h:mmaa"
              onChange={(date) => setDate(date)}
              />
            </div>
          </label>
        </div>
        <button className="button" type="submit">
          Create
        </button>
      </form>
    </>
  );
}
