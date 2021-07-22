import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EventPage from "./userPage/EventPage";
import { followUsers, unfollowUser } from "../store/follow";
import { Container, Row, Col } from "react-bootstrap";
function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userId } = useParams();
  const sessUser = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.follow);
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  const follow = () => {
    dispatch(followUsers(Number(userId), Number(sessUser.id)));
  };
  const unfollow = () => {
    dispatch(unfollowUser(Number(userId), Number(sessUser.id)));
  };
  if (!user) {
    return null;
  }

  if (userId == sessUser.id) {
    return (
      <Container className="userInfo">
        <div className="userCard">
          <h1>{user.username}'s Information</h1>
          <div>Age: {user.age}</div>
          <div>Description: {user.description}</div>
        </div>
        <EventPage />
      </Container>
    );
  }
  if (!following[userId])
    return (
      <Container className="userInfo">
        <div className="userCard">
          <h1>{user.username}'s Information</h1>
          <div>Age: {user.age}</div>
          <div>Description: {user.description}</div>
          <button type="submit" onClick={follow}>
            Follow
          </button>
        </div>
        <EventPage />
      </Container>
    );
  if (following[userId])
    return (
      <Container className="userinfo">
        <Container className="userCard">
          <h1>{user.username}'s Information</h1>
          <Row>Age: {user.age}</Row>
          <Row>Description: {user.description}</Row>
          <button type="submit" onClick={unfollow}>
            Unfollow
          </button>
        </Container>
        <EventPage />
      </Container>
    );

  // return (
  //   <div className="userPageContainer">
  //     <div className="userCard">
  //       <h1>{user.username}'s Information</h1>
  //       <div>Age: {user.age}</div>
  //       <div>Description: {user.description}</div>
  //       {followed ? <button type="submit" onClick={unfollow}>Unfollow</button>: <button type="submit" onClick={follow}>
  //         Follow
  //       </button>}
  //     </div>
  //     <EventPage />
  //   </div>
  // );
}
export default User;
