import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { showPopup } from '../action';

const SignUp = () => {
    const [email, setemail]= useState("");
    const [password, setpassword]= useState("");
    const [name, setName]= useState("");

    const dispatch= useDispatch();

    const handleSignUp = () => {
        
        fetch("http://localhost:5002/signup", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    
                    throw new Error(JSON.stringify(error));
                });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            // Handle the error
            const errorObj = JSON.parse(error.message);
            dispatch(showPopup({message:errorObj.error.errors[0].message, visible:true}));
            // console.log('Error:', errorObj.errors);
            console.log(errorObj.error.errors[0].message);
        });
    };
    
  return (
   <>
    <h1>SignUp Page</h1>
    <div>
        <label>
            Enter Name:
            <input/>
        </label>
        <label>
            enter email:
            <input onChange={e=>setemail(e.target.value)}/>
        </label>
        <label>
            enter password:
            <input onChange={e=>setpassword(e.target.value)}/>
        </label>
        <button onClick={handleSignUp}>Signup</button>
    </div>
   </>
  )
}

export default SignUp;