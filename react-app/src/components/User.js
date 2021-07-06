import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EventPage from "./userPage/EventPage";
import {followUsers} from "../store/follow";

function User() {
  const [user, setUser] = useState({});
  const [followed, setFollowed] = useState(false)
  // Notice we use useParams here instead of getting the params
  // From props.
  const dispatch = useDispatch();
  const { userId }  = useParams();
  const sessUser = useSelector(state => state.session.user)
  const following = useSelector(state => state.follow)
  
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
  const boolean = () =>{
    if(sessUser.id){
      console.log('sessuser doesnt match')
      if(!(following[userId])){
      return(
      <button type='submit' onClick={follow}>Follow</button>)
    }
      else if(following[userId]){
        return(
          <button type='submit' onClick={follow}>Unfollow</button> 
        )
      }
    }
  }
  return (
    <div className='userPageContainer'>
      <div className='userCard'>
        <h1>{user.username}'s Information</h1>
        <div>Age: {user.age}</div>
        <div>Description: {user.description}</div>
        {boolean}
      </div>
      <EventPage />
    </div>
  );
}
export default User;
