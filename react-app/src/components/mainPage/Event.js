import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { loadAllEvents } from "../../store/event";
import {Link} from 'react-router-dom';

export default function Event() {
  const dispatch = useDispatch()
  const events = useSelector(state => Object.values(state.event))
  const getUser = async function getting(id){
    const res = await fetch(`/api/users/${id}`)
    const data = await res.json()
    
    return `${data.username}`
  }

  useEffect(()=>{
    dispatch(loadAllEvents())
  },[dispatch])

  if(!events) return(
    <div>Loading...</div>
  )
  return (
    <>
      <div className="Event">
        <h1>Events</h1>
          {events &&(
            events.map(event =>(
              <div className="event-container">
                <h2>{event.name}</h2>
                  <div>Description: {event.description}</div>
                  <div>Category: {event.category}</div>
                  <div>City: {event.city}</div>
                  <div>Location: {event.location}</div>
                  <div>Date and Time: {event.when.slice(0,24)}</div>
                  <Link to={`/users/${event.userId}`}><button>Click here to see user</button></Link>
              </div>
            ))
          )}
      </div>
    </>
  );
}
