import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Form, Modal, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../store/event";

export default function EventForm() {
  const dispatch = useDispatch();
  const dayte = moment();
  const nextDay = moment(dayte.add(1, "days"));

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Night Life");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(new Date(nextDay));
  const userId = useSelector((state) => state.session.user.id);

  const create = async (e) => {
    e.preventDefault();
    dispatch(
      createEvent(name, category, description, location, city, date, userId)
    );
  };
  return (
    <Form onSubmit={create} style={{ color: "#9bdfd9" }}>
      <Modal.Header closeButton>Create An Event</Modal.Header>
      <Form.Group as={Col} className='mb-4'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group as={Col} className='mb-4'>
        <Form.Label>Brief Description</Form.Label>
        <Form.Control
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Label className='mr-4'>Category  :</Form.Label>
        <Form.Control as='select'
          onChange={(e) => setCategory(e.target.value)}
          custom
          className='ml-4'
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
        <Form.Group as={Col} className='mb-4'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group as={Col} className='mb-4'>
          <Form.Label className='mb-4'>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
      </Row >
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
        Create
      </button>
    </Form>
  );
}
