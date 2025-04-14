import React from "react";
import {useEffect} from "react";
import people from "../data/peopleData.json"
import { Link } from 'react-router-dom'
import noProfilePhoto from '../assets/no-profile-photo.svg'

export default function PeopleDirectory(){

    const peopleCards = people.map((person) => {
        
        return(
            <Link 
                to={'/people/' + person.firstName + '_' + person.lastName} 
                state={person}
                key={person.birth + person.fullName}
                className="person-card-link link">
                <div className="person-card">
                    {<img 
                        src={person.profilePhoto ? ("https://lanefamilysite.s3.us-east-2.amazonaws.com/profilePhotos/" + person.profilePhoto + ".jpg") : noProfilePhoto} 
                        className="person-card-photo"
                        loading="lazy"/>}
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