import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../action";

const Navbar = () => {
  const isLogged= useSelector(e=>e.manageIsLoggedIn);
  const dispatch= useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const session_id = Cookies.get("session_id");
    if (session_id) {
        fetch(`http://localhost:5002/session/sessionvalid/${session_id}`).then(e=>e.json()).then(e=>{
            if(e.valid){
                dispatch(isLoggedIn(true));
            }else{
                Cookies.remove("session_id");
                Cookies.remove("user_id");
                navigate("/login");
            }
        })
    
    }
  });

  const handleLogOut = () => {
    const session_id = Cookies.get("session_id");
    fetch(`http://localhost:5002/signout/${session_id}`, {
      credentials: "include",
    })
      .then((e) => e.json())
      .then((e) => {
        navigate("/login");
        dispatch(isLoggedIn(false));
        Cookies.remove("session_id");
        Cookies.remove("user_id");
      });
  };
  return (
    <>
      <nav style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center", padding:"20px", background:"grey"}}>
        <h2>Hotstar Demo</h2>
        {isLogged && <button onClick={handleLogOut}>SignOut</button>}
        {!isLogged && (
          <button onClick={() => navigate("/login")}>SignIn</button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
