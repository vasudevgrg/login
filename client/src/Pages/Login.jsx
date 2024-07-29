import React, { useState, useEffect } from 'react'
import OtpModal from '../Components/OtpModal';
import io from "socket.io-client";
import Cookies from "js-cookie";
import DisplayOTP from '../Components/DisplayOTP';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showPopup } from '../action';

const Login = () => {
    const [email, setemail]= useState("");
    const [showModal, setShowModal]= useState(false);
    const [showDisplayModal, setShowDisplayModal]= useState(false);
    const [otp, setOtp]= useState(0);
    const navigate= useNavigate();
    const dispatch= useDispatch();

    useEffect(() => {
        const socket = io('http://localhost:5002', {
            withCredentials: true,
        });
    
        socket.on('connect', () => {
            console.log('Connected to server');
        });
    
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    
        socket.emit('join_room', { room: Cookies.get("user_id") });
    
        socket.on('otp', (data) => {
            console.log(data.otp);
            setOtp(data.otp);
            // setShowDisplayModal(true);
        });
    
        return () => {
            socket.off('otp');
            socket.disconnect();
        };
    }, []);
    

    const handleLogin = () => {
        fetch("http://localhost:5002/login", {
            method: "POST",
            body: JSON.stringify({
                email: email
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.status === true) {
                const session_id = Cookies.get("session_id");
                if (!session_id) {
                    setShowModal(true);
                } else {
                    setShowDisplayModal(true);
                }
            } else {
                navigate("/loginbypassword");
            }
        })
        .catch(error => {
            console.log(error);
            setemail("");
            dispatch(showPopup({ message: error.message, visible: true }));
        });
    }
    
  return (
    <>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", padding:"10px", margin:"10px"}}>
    <h1>Login Page</h1>
    <div >
        <label>
            enter email:
            <input value={email} onChange={e=>setemail(e.target.value)} style={{margin:"10px"}}/>
        </label>
        <button onClick={handleLogin}>Login</button>
        <button onClick={()=>navigate("/signup")}>SignUp</button>
    </div>
    {
        showModal && <OtpModal setShowModal={setShowModal}/>
    }
    {
        showDisplayModal && <DisplayOTP otp={otp} setShowDisplayModal={setShowDisplayModal}/>
    }
    </div>
    </>
  )
}

export default Login