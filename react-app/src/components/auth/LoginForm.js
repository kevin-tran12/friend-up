import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logDemo = () => dispatch(login("demo@aa.io", "password"));
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

      <form onSubmit={onLogin} className='login-form'>
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button type="submit">Login</button>
          <button onClick={logDemo}>Demo Login</button>
        </div>
      </form>
      <div className="About">
        <h1>Welcome to Friender-Up!</h1>
        <div>Ever feel like there's so much to do out there in the world but there's no one to do it with? Well look no further, this website is dedicated to people like you! Create an account to find out more.</div>
        <div className='images'>
          <img src="https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg" alt='picture' width='700' height='500'/>
          <img src='https://cdn.pixabay.com/photo/2017/07/21/23/57/concert-2527495_960_720.jpg' alt='picture1' width='700' height='500'/>
          <img src='https://cdn.pixabay.com/photo/2016/03/27/18/40/big-air-1283525_960_720.jpg' alt='picture1' width='700' height='500'/>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
