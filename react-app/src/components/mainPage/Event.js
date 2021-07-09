import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { loadAllEvents } from "../../store/event";
import {Link} from 'react-router-dom';
import { reserveEvent, unreserveEvent } from "../../store/reserve";

export default function Event() {
  const dispatch = useDispatch()
  const events = useSelector(state => Object.values(state.event))
  const userId = useSelector(state => state.session.user.id)
  const reserved = useSelector(state => state.reserve)

  useEffect(()=>{
    dispatch(loadAllEvents())
  },[dispatch])
  const reserve = (e) =>{
    e.preventDefault()
    dispatch(reserveEvent(userId,Number(e.target.value)))

  }
  const unreserve = (e) =>{
    e.preventDefault()
    dispatch(unreserveEvent(userId, Number(e.target.value)))
  }

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
                <Link to={`/users/${event.userId}`}><h2 className='eventName'>{event.name}</h2></Link>
                  <div>Description: {event.description}</div>
                  <div>Category: {event.category}</div>
                  <div>City: {event.city}</div>
                  <div>Location: {event.location}</div>
                  <div>Date and Time: {event.when.slice(0,24)}</div>
                  <div className='event buttons'>
                  {userId==event.userId ? <div></div>:<Link to={`/users/${event.userId}`}><button>Click Here to See User</button></Link>}
                  {!(event.userId ==userId)&&(
                    <div>{reserved[event.id] ? <button value={`${event.id}`} onClick={unreserve}>Unreserve</button>:<button value={`${event.id}`} onClick={reserve}>Click to Join</button>}</div>)}
                  </div>
              </div>
            ))
          )}
      </div>
    </>
  );
}
