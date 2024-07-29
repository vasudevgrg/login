import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import { sessions } from '../action';

const SessionCard = ({data, idx}) => {
    const [thisDevice, setThisDevice]= useState(false);
    useEffect(()=>{
        const session_id= Cookies.get("session_id");
        if(data.id==session_id){
            setThisDevice(true);
        }
    },[]);
    const dispatch= useDispatch();
    const handleSession= ()=>{
        fetch(`http://localhost:5002/session/removedevice/${data.id}`,{
            credentials:'include'
        }).then(e=>e.json()).then(e=>dispatch(sessions(e.sessions)));
    }
  return (
    <>
    <tr>
    <td>{idx+1}</td>
    <td> {data.id} </td>
    <td>{data.location}</td>
   {!thisDevice&& <td><button onClick={handleSession}>Remove Device</button></td>}
   {thisDevice && <td>This is your device</td>}
   </tr>
    </>
  )
}

export default SessionCard