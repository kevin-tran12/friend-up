import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EventPage from "./userPage/EventPage";
import {followUsers} from '../store/session';
import FollowingPage from "./userPage/Following";
function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const dispatch = useDispatch();
  const { userId }  = useParams();
  const sessUser = useSelector(state => state.session.user)
  useEffect(() => {
    // if (!userId) {
    //   return (
    //     <div>
    //       <EventPage />

    //     </div>
    //   )
    // }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  const follow = () =>{
    dispatch(followUsers(Number(userId), sessUser.id))
  }
  if (!user) {
    return null;
  }
  console.log(sessUser)
  return (
    <div className='userPageContainer'>
      <div className='userCard'>
        <h1>{user.username}'s Information</h1>
        <div>Age: {user.age}</div>
        <div>Description: {user.description}</div>
        {!(sessUser.id == userId) &&(
          <button type='submit' onClick={follow}>Follow</button>
        )}
      </div>
      <EventPage />
      <FollowingPage userId={userId} />
    </div>
  );
}
export default User;
