import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showPopup } from "../action";

const OtpModal = ({ setShowModal }) => {
  const [otp, setOtp] = useState(0);
  const [seconds, setSeconds] = useState(55);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (seconds == 0) {
      setShowModal(false);
    }
    setTimeout(() => {
      const sec = seconds;
      setSeconds(sec - 1);
    }, 1000);
  }, [seconds]);

  const handleVerifyOtp = async () => {
    fetch(`http://localhost:5002/verifyotp/${otp}`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Something went wrong");
          });
        }
        return response.json();
      })
      .then((e) => navigate("/"))
      .catch((err) => {
        setShowModal(false);
        dispatch(showPopup({ message: err.message, visible: true }));
      });
  };
  return (
    <>
      <div className="modal-wrapper" onClick={() => setShowModal(false)}></div>
      <div className="modal-container">
        <h2>Enter your OTP:</h2>
        <input onChange={(e) => setOtp(e.target.value)} />
        <button onClick={handleVerifyOtp}>Submit OTP</button>
        <div>Time remaining: 00:{seconds} sec.</div>
      </div>
    </>
  );
};

export default OtpModal;
