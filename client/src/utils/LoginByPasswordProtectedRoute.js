import React, { useState } from 'react'
import {Navigate, useLocation} from "react-router-dom";

import Cookies from 'js-cookie';

const LoginByPasswordProtectedRoute = ({children}) => {
    let location = useLocation();
   let user_id= Cookies.get('user_id');
  console.log(user_id);
   
    if(!user_id){
        return <Navigate to="/login" state={{ from: location}} replace />
       }
 return children

};

export default LoginByPasswordProtectedRoute;