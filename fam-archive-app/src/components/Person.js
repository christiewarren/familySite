import React from "react";
import { useEffect } from "react";
import images from '../data/imageData.json'
import Thumbnail from "./Thumbnail";
import { useLocation, Link, useParams } from "react-router-dom"
import people from "../data/peopleData.json";
import PeopleList from './PeopleList'
import PhotosPage from "./PhotosPage"
import noProfilePhoto from '../assets/no-profile-photo.svg'
import backArrow from '../assets/left-arrow-green.svg'



export default function Person(){
    // const person = useLocation().state
    // const [person, setPerson] = React.useState(useLocation().state)  
    
    const {name} = useParams()

    const [personFirstName, personLastName] = name.split('_')
    const person = people.find((person) => person.fullName == personFirstName + ' ' + personLastName)


    useEffect(() => {
        // Reset the scroll position to the top of the page whenever person is updated
        window.scrollTo(0, 0);
      }, [person]); 


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

    return(
        <div>
            <div className="profile-wrap-with-link">
                <Link to={'/people/'} className='back-link link'><img src={backArrow} /> Back to all people</Link>
                <div className="profile-wrap">
                    <div className="profile-photo-wrap">
                    {<img src={person.profilePhoto ? ("https://lanefamilysite.s3.us-east-2.amazonaws.com/profilePhotos/" + person.profilePhoto + ".jpg") : noProfilePhoto}  className="person-card-photo"/>}
                    </div>
                    <div className="profile-details">
                        <h1>{fullName}</h1>
                        {person.birth && <small className="birth">{person.birth} - {person.death ? person.death : 'present'}</small>}
                        <hr className="profile-divider"></hr>
                        <div className="relationships">
                            {person.spouse && <div className="spouse-wrap">
                                <PeopleList
                                    title='spouse' 
                                    contents={[person.spouse]}
                                    isInModal={false}
                                />
                            </div>}
                            {person.children[0] && <div className="children-wrap">
                                <PeopleList
                                    title='children' 
                                    contents={person.children}
                                    isInModal={false}
                                />
                            </div>}
                            {person.parents[0] && <div className="parents-wrap">
                                <PeopleList
                                    title='parents' 
                                    contents={person.parents}
                                    isInModal={false}
                                />
                            </div>}
                            {person.siblings[0] && <div className="siblings-wrap">
                                <PeopleList
                                    title='siblings' 
                                    contents={person.siblings}
                                    isInModal={false}
                                />
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div id="photos">
                <div className='photo-grid-wrap'>
                    <div className='photo-grid'>
                        {/* render a photo section that's filtered by photos of this person */}
                        <PhotosPage 
                            filterDetails={{
                                isFiltered: true,
                                filterType: "person",
                                sections: [person.fullName]
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}