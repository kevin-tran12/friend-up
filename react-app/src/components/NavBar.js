import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import EventForm from "./mainPage/CreateEvent";
import "react-datepicker/dist/react-datepicker.css";
import "./nav.css";
import { login } from "../store/session";

const NavBar = () => {
  let user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const closeForm = () => setForm(false);
  const logDemo = () => dispatch(login("demo@aa.io", "password"));

  return (
    <nav className="navContainer">
      <ul className="navItems">
        {user && (
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              <button>Home</button>
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink
              to={`/users/${user.id}`}
              exact={true}
              activeClassName="active"
            >
              <button>My Page</button>
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <button onClick={() => setForm(true)}>Create An Event</button>
            {form && (
              <div className="modal">
                <button id="close" onClick={() => setForm(false)}>
                  X
                </button>
                <EventForm closeForm={closeForm} />
              </div>
            )}
          </li>
        )}
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
      </ul>
    </nav>
  );
};

export default NavBar;
