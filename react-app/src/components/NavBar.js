import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import EventForm from "./mainPage/CreateEvent";
import {Navbar, Modal} from 'react-bootstrap';
import { login } from "../store/session";

const NavBar = () => {
  let user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const openForm = () => setForm(true)
  const closeForm = () => setForm(false);
  const logDemo = () => dispatch(login("demo@aa.io", "password"));

  return (
    <Navbar bg='dark' variant='dark'>
        {user && (
            <Navbar.Brand href="/" exact={true} activeClassName="active">
              <button>Home</button>
            </Navbar.Brand>
        )}
        {user && (
          <li>
            <Navbar.Brand
              to={`/users/${user.id}`}
              exact={true}
              activeClassName="active"
            >
              <button>My Page</button>
            </Navbar.Brand>
          </li>
        )}
        {user && (
            <Navbar.Brand>
              <button onClick={openForm}>Create An Event</button>
            </Navbar.Brand>
            )}
          <Modal show={form} onHide={closeForm}>
            <EventForm/>
          </Modal>
        {!user && (
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              <button>Login</button>
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              <button>Sign Up</button>
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <button onClick={logDemo}>Demo Login</button>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              <button>Users</button>
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <LogoutButton />
          </li>
        )}
    </Navbar>
  );
};

export default NavBar;
