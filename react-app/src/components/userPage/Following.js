import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllFollow } from "../../store/follow";
import "./Following.css";
import { NavLink } from "react-router-dom";
import { loadAllReserves } from "../../store/reserve";

export default function FollowingPage(props) {
  const { userId } = props;
  const following = useSelector((state) => Object.values(state.follow));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllFollow(userId));
    dispatch(loadAllReserves(userId));
  }, [dispatch]);
  const reservedEvent = useSelector(state => Object.values(state.reserve))

  return (
    <div className="sideNav">
        <h2>Following:</h2>
        <ul className='ListItems'>
        {following?.map((follow) => (
          <li key={follow.id}><NavLink to={`/users/${follow.id}`}>
          <button>{follow.username}</button>
        </NavLink></li>
      ))}
      </ul>
      <h2>Reserved:</h2>
      <ul className="ListItems">{reservedEvent?.map((reserve) =>(
        <li key={reserve.id}><NavLink to={`/users/${reserve.user_id}`}><button>{reserve.name}</button></NavLink></li>
      ))}</ul>
    </div>
  );
}
