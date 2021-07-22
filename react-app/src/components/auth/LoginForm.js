import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { Form, Button, Container, Row, Col  } from "react-bootstrap";
const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logDemo = () =>{
    setEmail("demo@aa.io")
    setPassword("password")
    dispatch(login(email,password ));
  }
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='login-page'>
      <Container className='bg-dark'>
        <Form onSubmit={onLogin} style={{color:'#9bdfd9'}}>
          <Row>
            {errors.map((error) => (
              <Row>{error}</Row>
            ))}
          </Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button type="submit">Login</button>
            <button onClick={logDemo}>Demo Login</button>
          </Form.Group>
        </Form>
      </Container>
      <Container style={{color:'#9bdfd9'}} className='d-inline'>
        <h1 style={{textAlign:'center'}}>Welcome to Friender-Up!</h1>
        <div>Ever feel like there's so much to do out there in the world but there's no one to do it with? Well look no further, this website is dedicated to people like you! Create an account to find out more.</div>
        <div className='d-flex mt-5'>
          <img src="https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg" ClassName='img-responsive' alt='picture' width='700' height='500'/>
          <img src='https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_960_720.jpg' ClassName='img-responsive' alt='picture1' width='700' height='500'/>
          <img src='https://cdn.pixabay.com/photo/2016/03/27/18/40/big-air-1283525_960_720.jpg' ClassName='img-responsive' alt='picture1' width='700' height='500'/>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
