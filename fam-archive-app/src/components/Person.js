import React from "react";
import images from '../data/imageData.json'
import Thumbnail from "./Thumbnail";
import { useLocation, Link } from "react-router-dom";

export default function Person(){
    const person = useLocation().state
    const parents = person.parents.map((parent) => <p>{parent}</p>)
    const siblings = person.siblings.map((sibling) => <p>{sibling}</p>)
    const children = person.children.map((child) => <p>{child}</p>)

    const personPhotos = images.filter((image) => image.people.includes(person.firstName + ' ' + person.lastName))

    const cards = personPhotos.map((photo) => {
        return(
            <Thumbnail src={photo.filename} key={photo.filename} />)
        })

    return(
        <div>
            <div className="profile-wrap">
                <div className="profile-photo-wrap">
                    <img src={require('../assets/' + person.profilePhoto)} className="profile-photo"/>
                </div>
                <div className="profile-details">
                    <h1>{person.firstName + ' ' + person.lastName}</h1>
                    <p>{person.birth}</p>
                    <div className="relationships">
                        <div className="parents-wrap">
                            <h4>Parents</h4>
                            {parents}
                        </div>
                        {person.siblings && <div className="siblings-wrap">
                            <h4>Siblings</h4>
                            {siblings}
                        </div>}
                        {person.spouse && <div className="spouse-wrap">
                            <h4>Spouse</h4>
                            <p>{person.spouse}</p>
                        </div>}
                        {person.children && <div className="children-wrap">
                            {children}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="person-photos">
                <div className='photo-grid-wrap'>
                    <div className='photo-grid'>
                        {cards}
                    </div>
                </div>
            </div>
        </div>
    )
}