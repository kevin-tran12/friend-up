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
  let goingTo = []
  const reservedEvent = useSelector(state => Object.values(state.reserve))
  const events = useSelector(state => Object.values(state.event))
  reservedEvent.forEach(r =>{
    events.forEach(e =>{
      if(e.id==r.event_id) goingTo.push(e)
    })
  })

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
      <ul className="ListItems">{goingTo?.map((reserve) =>(
        <li key={reserve.id}><NavLink to={`/users/${reserve.userId}`}><button>{reserve.name}</button></NavLink></li>
      ))}</ul>
    </div>
  );
}
