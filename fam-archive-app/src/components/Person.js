import React from "react";
import people from "../data/peopleData.json"
import { useParams } from "react-router-dom";

export default function Person(){
    const { name } = useParams()
    return(
        <div>
           {name}
        </div>
    )
}