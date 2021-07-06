import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadAllFollow } from '../../store/follow';
import './Following.css'

export default function FollowingPage(props) {
    const {userId} = props
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(loadAllFollow(userId))
    },[dispatch])
    return(
        <div className='sideNav'>{userId}</div>
    )
}