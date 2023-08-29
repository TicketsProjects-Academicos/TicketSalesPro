
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";


const Logout = () => {
    
    const dispatch = useDispatch(); 

    useEffect(() => {
        localStorage.clear();
        window.location.reload();

    });

    return(

        <Navigate to='/' replace />

    )

}

export default Logout