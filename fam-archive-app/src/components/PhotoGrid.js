import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'

export default function PhotoGrid(){
    const cards = images.map(image => {
        // {console.log(image)}
        return(
            image.filename != 'ewarren_child.jpeg' && <div className={'card ' + image.orientation}>
                <Thumbnail
                src={image.filename}
                key={image.filename}
                clickFunction={() => openPhotoModal(image.filename, image.subject, image.people, image.place, image.time, image.orientation)}
                />
                {image.type == "document" && <div className='doc-title-bar'><p>{image.title}</p></div>}
            </div>
        )
        })
    
    //create state for photo date, place, and people
    const [photoDate, setDate] = React.useState('')
    const [photoPlace, setPlace] = React.useState([''])
    const [photoPeople, setPeople] = React.useState([''])

    function openPhotoModal(clickedImage, subject, people, place, date, orientation){
        togglePhotoModal()
        setPhotoModalImage(clickedImage)
        addOverlayListener()

        //update state of date, place and people based on the clicked thumbnail
        setDate(date)
        setPlace(place)
        setPeople(people)

        //when thumbnail is clicked: toggle modal-is-shown class and set image source
    }

    function closePhotoModal(){
        togglePhotoModal()
        addXListener()

        //problem: console always logs clicked when overlay is clicked, but modal doesnt disappear. Class highlights in dev mode, but doesn't turn off 
        console.log('clicked')

        //when overlay or x is clicked: toggle modal-is-shown-class (to hide modal)
    }
    

    function togglePhotoModal(){
        let photoModal = document.getElementById('photo-modal')
        photoModal.classList.toggle('photo-modal-is-shown')

        //toggle photo-modal-is-shown class, which changes visibility to visible (may find a better way to do this)
    }

    function setPhotoModalImage(clickedImage){
        let photoModalImage = document.getElementById('photo-modal-img')
        photoModalImage.src = require('../assets/' + clickedImage)

        //use image filepath of clicked image to set src of modal image
    }


    function addOverlayListener(){
        let photoModalOverlay = document.getElementById('photo-modal-overlay')
        photoModalOverlay.addEventListener('click', closePhotoModal)

        //add event listener to overlay to close modal when clicked
    }

    function addXListener(){
        let photoModalXButton = document.getElementById('close-modal-button')
        photoModalXButton.addEventListener('click', closePhotoModal)

        //add event listener to x buttonn to close modal when clicked
    }

    return(
        <div>
        <div className='photo-grid'>
            {cards}
        </div>
        <PhotoModal
            //pass (up to date) state of date, place, and people to photo modal
            date = {photoDate}
            place = {photoPlace}
            people = {photoPeople}
        />
    </div>

    )
}