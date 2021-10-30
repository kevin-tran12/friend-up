import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllFollow } from "../../store/follow";
import { NavLink } from "react-router-dom";
import { loadAllReserves, unreserveEvent } from "../../store/reserve";
import { Nav } from "react-bootstrap";

export default function FollowingPage(props) {
  const { userId } = props;
  const following = useSelector((state) => Object.values(state.follow));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllFollow(userId));
    dispatch(loadAllReserves(userId));
  }, [dispatch, userId]);
  const reservedEvent = useSelector((state) => Object.values(state.reserve));
  console.log(reservedEvent)
  const unreserve = (e) =>{
    e.preventDefault()
    dispatch(unreserveEvent(userId, Number(e.target.value)))
  }
  return (
    <Nav className='sidebar bg-dark'>
      <h2>Following:</h2>
      <ul className="ListItems">
        {following?.map((follow) => (
          <li key={follow.id}>
            <NavLink to={`/users/${follow.id}`}>
              <button>{follow.username}</button>
            </NavLink>
          </li>
        ))}
      </ul>
      <h2>Reserved:</h2>
      <ul className="ListItems">
        {reservedEvent?.map((reserve) => (
          <li className='reserveList' key={reserve.id}>
            <NavLink to={`/users/${reserve.user_id}`}>
              <button>{reserve.name}</button>
            </NavLink>
            <button className='reserveListItem' value={reserve.event_id} onClick={unreserve}>Unreserve</button>
          </li>
        ))}
      </ul>
    </Nav>
  );
}
