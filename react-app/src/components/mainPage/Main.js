import React, { useState } from "react";
import Event from "./Event";
import EventForm from "./CreateEvent";
import "./mainPage.css";

export default function Main() {
  const [form, setForm] = useState(false);
  const closeForm = () => setForm(false);

  return (
    <div>
      <button onClick={() => setForm(true)}>Create An Event</button>
      {form && (
        <div className="modal">
          <button id="close" onClick={() => setForm(false)}>
            X
          </button>
          <EventForm closeForm={closeForm} />
        </div>
      )}
      <div className="event">
        <Event />
      </div>
    </div>
  );
}
