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
                key={image.title}
                clickFunction={() => openPhotoModal(image.filename)}
                />
                {image.type == "document" && <div className='doc-title-bar'><p>{image.title}</p></div>}
            </div>
        )
        })
    
    function openPhotoModal(clickedImage){
        togglePhotoModal()
        setPhotoModalImage(clickedImage)
        addOverlayListener()

        //when thumbnail is clicked: toggle modal-is-shown class and set image source
    }

    function closePhotoModal(){
        togglePhotoModal()

        //when overlay is clicked: toggle modal-is-shown-class (to hide modal)
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

    return(
        <div>
        <div className='photo-grid'>
            {cards}
        </div>
        <PhotoModal/>
    </div>

    )
}