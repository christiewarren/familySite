import React from "react";
import people from "../data/peopleData.json"
import { Link } from 'react-router-dom'


export default function PeopleList(props){
    const contents = props.contents
    
    const peopleList = contents.map(person => {
        let personObject = people.filter((index) => index.fullName == person)[0]

        if(personObject){
            return(
            <Link 
                to={'/people/' + personObject.firstName + '-' + personObject.lastName} 
                state={personObject} 
                className='photo-person-link'
                key={personObject.birth + personObject.fullName}>
                    
            {person}</Link>)
        }return(<p key={person}>{person}</p>)
    })

    return(
        <>
        {props.title && <h4>{props.title}</h4>}
            {peopleList}
        </>
    )
}