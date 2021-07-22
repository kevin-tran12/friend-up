import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { loadAllEvents } from "../../store/event";
import {Link} from 'react-router-dom';
import { reserveEvent, unreserveEvent } from "../../store/reserve";
import {Container,Row,Col} from 'react-bootstrap'
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
    <Container fluid className='event'>
      <div className="Event">
        <Row><h1 className='header-event'>Events</h1></Row>
          {events &&(
            events.map(event =>(
              <Container className="event-container bg-dark mb-5">
                <h2 className='eventName'>{event.name}</h2>
                  <Col>Description: {event.description}</Col>
                  <Col>Category: {event.category}</Col>
                  <Col>City: {event.city}</Col>
                  <Col>Location: {event.location}</Col>
                  <Col>Date and Time: {event.when.slice(0,24)}</Col>
                  <div className='event buttons'>
                  {userId==event.userId ? <div></div>:<Link to={`/users/${event.userId}`}><button>Click Here to See User</button></Link>}
                  {!(event.userId ==userId)&&(
                    <div>{reserved[event.id] ? <button value={`${event.id}`} onClick={unreserve}>Unreserve</button>:<button value={`${event.id}`} onClick={reserve}>Click to Join</button>}</div>)}
                  </div>
              </Container>
            ))
          )}
      </div>
    </Container>
  );
}
