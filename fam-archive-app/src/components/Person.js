import React from "react";
import images from '../data/imageData.json'
import Thumbnail from "./Thumbnail";
import { useLocation, Link } from "react-router-dom";
import people from "../data/peopleData.json";
import downArrow from '../assets/down-arrow.svg'

export default function Person(){
    const person = useLocation().state
    const fullName = person.fullName

    //filter all images by those that include this person
    const personPhotos = images.filter((image) => image.people.includes(fullName))

    const cards = personPhotos.map(image => {
        return(
            <div className={'card ' + image.orientation}>
                <Thumbnail src={image.filename} key={image.filename} />
                {image.type == "document" && <div className='doc-title-bar'><small>{image.title}</small></div>}
            </div>
        )
        })

    //for each parent/sibling/child/spouse, if their name matches a fullName in PeopleData, return a link to their page. otherwise, return a p tag with their name. NOTE: *very* repetitive code, will want to make a component  for PeopleList to make this reusable
        const parents = person.parents.map(parent => {
            let personObject = people.filter((index) => index.fullName == parent)[0]

            if(personObject){
                return(<Link to={'/people/' + personObject.firstName + '-' + personObject.lastName} state={personObject} className='photo-person-link'>{parent}</Link>)
            }return(<p>{parent}</p>)   
        })

        const siblings = person.siblings.map(sibling => {
            let personObject = people.filter((index) => index.fullName == sibling)[0]

            if(personObject){
                return(<Link to={'/people/' + personObject.firstName + '-' + personObject.lastName} state={personObject} className='photo-person-link'>{sibling}</Link>)
            }return(<p>{sibling}</p>)   
        })

        const children = person.children.map(child => {
            let personObject = people.filter((index) => index.fullName == child)[0]

            if(personObject){
                return(<Link to={'/people/' + personObject.firstName + '-' + personObject.lastName} state={personObject} className='photo-person-link'>{child}</Link>)
            }return(<p>{child}</p>)   
        })


    return(
        <div className="person-wrap">
            <div className="profile-wrap">
                <div className="profile-photo-wrap">
                    <img src={require('../assets/' + person.profilePhoto)} className="profile-photo"/>
                </div>
                <div className="profile-details">
                    <h1>{fullName}</h1>
                    <small className="birth">{person.birth} - {person.death ? person.death : 'present'}</small>
                    <hr className="profile-divider"></hr>
                    <div className="relationships">
                        {person.spouse && <div className="spouse-wrap">
                            <h4>Spouse</h4>
                            <p>{person.spouse}</p>
                        </div>}
                        {person.children[0] && <div className="children-wrap">
                            <h4>Children</h4>
                            {children}
                        </div>}
                        <div className="parents-wrap">
                            <h4>Parents</h4>
                            {parents}
                        </div>
                        {person.siblings && <div className="siblings-wrap">
                            <h4>Siblings</h4>
                            {siblings}
                        </div>}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div id="photos">
                <div className='photo-grid-wrap'>
                    <h2>Photos of {person.firstName}</h2>
                    <div className='photo-grid'>
                        {cards}
                    </div>
                </div>
            </div>
        </div>
    )
}