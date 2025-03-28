import React from "react";
import images from '../data/imageData.json'
import Thumbnail from "./Thumbnail";
import { useLocation, Link } from "react-router-dom";
import people from "../data/peopleData.json";
import PeopleList from './PeopleList'
import downArrow from '../assets/down-arrow.svg'
import noPhotoFound from '../assets/no-photo-found.svg'
import PhotoSection from "./PhotoSection";


export default function Person(){
    const person = useLocation().state
    const fullName = person.fullName

    //filter all images by those that include this person
    const personPhotos = images.filter((image) => image.people.includes(fullName))

    const cards = personPhotos.map(image => {
        return(
            <div className={'card ' + image.orientation} key={image.filename}>
                <Thumbnail 
                    src={image.filename} 
                    key={image.filename}
                    alt={image.filename} 
                />
                {image.type == "document" && <div className='doc-title-bar'><small>{image.title}</small></div>}
            </div>
        )
        })

    const tryRequireProfilePhoto = (path) => {
        try {
            return require('../assets/profilePhotos/' + path + '.jpg');
        } catch (err) {
        console.log(err);
            return noPhotoFound;
        }
    }



    return(
        <div className="person-wrap">
            <div className="profile-wrap">
                <div className="profile-photo-wrap">
                {<img src={tryRequireProfilePhoto(person.profilePhoto)} className="person-card-photo"/>}
                {/* {<img src={noPhotoFound} className="profile-photo"/>} */}
                </div>
                <div className="profile-details">
                    <h1>{fullName}</h1>
                    {person.birth && <small className="birth">{person.birth} - {person.death ? person.death : 'present'}</small>}
                    <hr className="profile-divider"></hr>
                    <div className="relationships">
                        {person.spouse && <div className="spouse-wrap">
                            <h4>Spouse</h4>
                            <p>{person.spouse}</p>
                        </div>}
                        {person.children[0] && <div className="children-wrap">
                            <PeopleList
                                title='children' 
                                contents={person.children}
                            />
                        </div>}
                        {person.siblings && <div className="parents-wrap">
                            <PeopleList
                                title='parents' 
                                contents={person.parents}
                            />
                        </div>}
                        {person.siblings && <div className="siblings-wrap">
                            <PeopleList
                                title='siblings' 
                                contents={person.siblings}
                            />
                        </div>}
                    </div>
                </div>
            </div>
            <hr></hr>
            <div id="photos">
                <div className='photo-grid-wrap'>
                    <div className='photo-grid'>
                        {/* render a photo section that's filtered by photos of this person */}
                        <PhotoSection 
                            filterType="person"
                            filterBy={person.fullName}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}