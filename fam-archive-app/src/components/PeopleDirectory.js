import React from "react";
import people from "../data/peopleData.json"
import { Link } from 'react-router-dom'


export default function PeopleDirectory(){

    const noPhotoFound = "https://lanefamilysite.s3.us-east-2.amazonaws.com/no-photo-found.svg"
    // const tryRequireProfilePhoto = (path) => {
    //     try {
    //         return require('../assets/profilePhotos/' + path + '.jpg');
    //     } catch (err) {
    //     console.log(err);
    //         return noPhotoFound;
    //     }
    // }

    const peopleCards = people.map((person) => {
        return(
            <Link 
                to={'/people/' + person.firstName + '_' + person.lastName} 
                state={person}
                key={person.birth + person.fullName}
                className="person-card-link link">
                <div className="person-card">
                
                    {<img src={"https://lanefamilysite.s3.us-east-2.amazonaws.com/profilePhotos/" + person.profilePhoto + ".jpg"} className="person-card-photo"/>}
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