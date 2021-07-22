import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import { login } from "../../store/session";
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [age, setAge] = useState();
  const [description, setDescription] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);
  const logDemo = () => dispatch(login("demo@aa.io", "password"));
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(username, email, password, age, description)
      );
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAge = (e) => {
    setAge(e.target.value);
  };
  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }
  let bool = [];
  if (password !== undefined && repeatPassword !== undefined) {
    if (password !== repeatPassword) {
      console.log(password, repeatPassword);
      bool.push("Password does not match.");
    }
  }
  if(description !== ''){
    if(description.length> 500){
      bool.push('Description must be less than 500 characters.')
    }
  }
  console.log(username)
  return (
    <Container className='bg-dark'>
      <h1 className='headersignup'>Sign Up</h1>
      {bool.length>0 && bool.map(err=> <h2 className='errors'>{err}</h2>)} 
      <Form onSubmit={onSignUp} style={{color:'#9bdfd9'}}>
        <Row className='mb-4'>
          <Form.Group as={Col}>
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="username" onChange={updateUsername} value={username} required/>
            <Form.Control.Feedback type='invalid'>Please provide a UserName.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={updateEmail} value={email} required/>
            <Form.Control.Feedback type='invalid'>Please provide a Email.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" name="age" min='1' max='90' onChange={updateAge} value={age} required/>
            <Form.Control.Feedback type='invalid'>Please provide an Age.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className='mb-4'>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" onChange={updateDescription} value={description} required/>
          <Form.Control.Feedback type='invalid'>Please provide a description.</Form.Control.Feedback>
        </Form.Group>
        <Row>
        <Form.Group as={Col}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={updatePassword} value={password} required/>
          <Form.Control.Feedback type='invalid'>Please provide a password.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="password" name="repeat_password" onChange={updateRepeatPassword} value={repeatPassword} required/>
          <Form.Control.Feedback type='invalid'>Please provide a password.</Form.Control.Feedback>
        </Form.Group>
        </Row>
        <div className='buttonSignUp'>
          <Button type="submit" className='mr-5 bg-light border-light text-dark'>Sign Up</Button>
          <Button onClick={logDemo} className='ml-5 bg-light border-light text-dark'>Demo Login</Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpForm;
