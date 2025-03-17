import React from "react";
import people from "../data/peopleData.json"
import { Link } from 'react-router-dom'
import noPhotoFound from '../assets/no-photo-found.svg'



export default function PeopleDirectory(){
    const peopleCards = people.map((person) => {
        return(
            <Link 
                to={'/people/' + person.firstName + '-' + person.lastName} 
                state={person}
                key={person.birth + person.fullName}
                className="person-card-link link">
                <div className="person-card">
                
                    {<img src={person.profilePhoto ? require('../assets/' + person.profilePhoto) : noPhotoFound} className="person-card-photo"/>}
                    <p className="person-card-name">{person.firstName + ' ' + person.lastName}</p>
                </div>
            </Link>


        )

    })
    return(
        <div className="people-cards-wrap">
            {peopleCards}
        </div>
    )
}