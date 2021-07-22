import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { loadUserEvents, removeEvent, updateEvent } from "../../store/event";
import DatePicker from "react-datepicker";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import moment from "moment";
export default function EventPage() {
  const userId = useParams();
  const dispatch = useDispatch();
  const sessUser = useSelector((state) => state.session.user.id);
  const events = useSelector((state) => Object.values(state.event));
  const eventId = useSelector((state) => state.event);
  const [form, setForm] = useState(false);
  const [going, setGoing] = useState(false);
  const closeForm = () => setForm(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Night Life");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());
  const [reserving, setReserve] = useState()
  const dayte = moment();
  const nextDay = moment(dayte.add(1, "days"));
  const openForm = (e) => {
    setForm(true);
    const props = eventId[e.target.value];
    setName(props.name);
    setCategory(props.category);
    setCity(props.city);
    setLocation(props.location);
    setDate(new Date(props.when));
    setDescription(props.description);
    setId(props.id);
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
    dispatch(
      updateEvent(
        name,
        category,
        description,
        location,
        city,
        date,
        Object.values(userId)[0],
        id
      )
    );
  };
  const showGoing = async (e) => {
    setGoing(true);
    setReserve(e.target.value)
    
  };
  const closeGoing = async (e) => {
    setGoing(false);
  };
  // console.log(Object.values(events[reserving]?.reserved))

    // return events[reserving]?.reserved.forEach(person =>{
    //   console.log(person)
    // })
  // }
  
  // const print = () =>{
  //   console.log('printing')
  //   return(
  //   )))
  // }
  const go =(
      <Modal show={true} onHide={closeGoing} style={{ color: "#9bdfd9" }}>
        <Container className="bg-dark">
          <h3>Reserved:</h3>
          <ul>
          {eventId[reserving]?.reserved?.users.map(person =>{
            return(
              <li>{person}</li>
              )})}
          </ul>
        </Container>
      </Modal>
    );
  return (
    <Container>
      <Container className="user-event">
        <h1>Events</h1>
        {going &&go}
        {!events.length && <h2>This user has no events yet.</h2>}
        {events &&
          events.map((event) => (
            <Container className="event-user bg-dark mt-5">
              <h2>{event.name}</h2>
              {sessUser == userId.userId && (
                <Container>
                  <button value={event.id} onClick={deleteItem}>
                    Cancel Event
                  </button>
                  <button value={event.id} onClick={openForm}>
                    Edit Event
                  </button>
                  <Modal show={form} onHide={closeForm}>
                    <Form
                      onSubmit={editEvent}
                      style={{ color: "#9bdfd9" }}
                      className="bg-dark"
                    >
                      <Modal.Header closeButton>Edit</Modal.Header>
                      <Form.Group as={Col} className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group as={Col} className="mb-4">
                        <Form.Label>Brief Description</Form.Label>
                        <Form.Control
                          type="textarea"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label className="mr-4">Category :</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(e) => setCategory(e.target.value)}
                          custom
                          className="ml-4"
                        >
                          <option value="Night Life">Night Life</option>
                          <option value="Sports">Sports</option>
                          <option value="Food">Food</option>
                          <option value="Chat">Chat</option>
                          <option value="Games">Games</option>
                          <option value="Chill">Chill</option>
                        </Form.Control>
                      </Form.Group>
                      <Row>
                        <Form.Group as={Col} className="mb-4">
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-4">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Row>
                      <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                          wrapperClassName="datepicker"
                          selected={date}
                          showTimeSelect
                          minDate={new Date(nextDay)}
                          dateFormat="MMMM d, yyyy h:mmaa"
                          onChange={(date) => setDate(date)}
                        />
                      </Form.Group>
                      <button className="button" type="submit">
                        Update
                      </button>
                    </Form>
                  </Modal>
                </Container>
              )}
              <Container>
                <div>Description: {event.description}</div>
                <div>Category: {event.category}</div>
                <div>City: {event.city}</div>
                <div>Location: {event.location}</div>
                <div>Date and Time: {event.when.slice(0, 24)}</div>
                <div>
                  {!!event.reserved ? (
                    <button value={event.id} onClick={showGoing}>
                      See who's going
                    </button>
                  ) : (
                    <div>No RSVP yet</div>
                  )}
                </div>
              </Container>
            </Container>
          ))}
      </Container>
    </Container>
  );
}

/*
  turn to a modal
  {!going && (
    <button id={event.id} value={event.id} onClick={showGoing}>
      See who's going
    </button>
  )}
 : (
                      <div>
                        <h3>Reserved:</h3>
                        {!event?.reserved &&(
                          <div>No rsvp yet.</div>
                        )}
                        {event?.reserved?.map((person) => (
                          <ul>
                            <li>
                              <Link
                                to={`/users/${person.userId}`}
                                className="btn"
                              >
                                <button onClick={closeGoing}>
                                  {person.users}
                                </button>
                              </Link>
                            </li>
                          </ul>
                        ))}
                        <button value={event.id} onClick={closeGoing}>
                          Close
                        </button>
                      </div>
                    )
*/
// turn to modal
