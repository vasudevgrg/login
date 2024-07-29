import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isLoggedIn, showPopup } from "../action";
import { useNavigate } from "react-router-dom";

const LoginByPassword = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:5002/loginbypassword", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(error => {
                throw new Error(error.message || 'Something went wrong');
            });
        }
        return response.json();
    })
    .then(data => {
        dispatch(isLoggedIn(true));
        navigate("/");
    })
    .catch(err => {
        dispatch(showPopup({ message: err.message, visible: true }));
    });
};

  return (
    <>
      <h1>Login Page</h1>
      <div>
        <label>
          enter email:
          <input onChange={(e) => setemail(e.target.value)} />
        </label>
        <label>
          enter password:
          <input onChange={(e) => setpassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default LoginByPassword;
