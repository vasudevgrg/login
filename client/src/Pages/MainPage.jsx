import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sessions } from '../action';
import SessionCard from '../Components/SessionCard';

const MainPage = () => {
    const allSessions= useSelector(e=>e.manageSessions);
    console.log(allSessions);
    const dispatch= useDispatch();
    React.useEffect(()=>{
        fetch("http://localhost:5002/session/getsessions",{
            method:"GET",
            credentials:'include'
        }).then(e=>e.json()).then(e=>{console.log(e.sessions);
            dispatch(sessions(e.sessions))});
    },[]);
  return (
   <>
   <h1>All Active Sessions:</h1>
   <table style={{border:"1px solid black"}}>
    <thead>
    <th>
        No.
    </th>
    <th>
        Session_id
    </th>
    <th>
        device
    </th>
    <th>
        Loggout from this device
    </th>
    
    </thead>
    <tbody>
    
    {
        allSessions.map((e, idx)=>(
            <SessionCard data={e} idx={idx}/>
        ))
    }
  
    </tbody>
   </table>
   </>
  )
}

export default MainPage