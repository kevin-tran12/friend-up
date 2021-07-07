import React from "react";
import { useDispatch } from "react-redux";
import { clearFollow } from "../../store/follow";
import { clearReserves } from "../../store/reserve";
import { logout } from "../../store/session";
import {clearEvents} from '../../store/event'
const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    dispatch(clearFollow());
    dispatch(clearReserves());
    dispatch(clearEvents());
  };

  return <button className='logout' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
