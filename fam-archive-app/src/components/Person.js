import React from "react";
import { useLocation } from "react-router-dom";

export default function Person(){
    const location = useLocation()
    return(
        <div>
           {location.state.firstName}
        </div>
    )
}