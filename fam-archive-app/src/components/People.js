import React from "react";
import people from "../data/peopleData.json"
import { Link } from 'react-router-dom'


export default function People(){
    const peopleCards = people.map((person) => {
        return(
            <Link to={'/people/' + person.firstName + '-' + person.lastName}>{person.firstName + ' ' + person.lastName}</Link>
        )

    })
    return(
        <div>
            {peopleCards}
        </div>
    )
}