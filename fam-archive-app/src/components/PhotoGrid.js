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
                clickFunction={togglePhotoModal}
                />
                {image.type == "document" && <div className='doc-title-bar'><p>{image.title}</p></div>}
            </div>
        )
        })

    function togglePhotoModal(){
        let photoModal = document.getElementById('photo-modal')
        let photoModalOverlay = document.getElementById('photo-modal-overlay')

        //add event listener to overlay to close modal when clicked
        photoModalOverlay.addEventListener('click', togglePhotoModal)

        //toggle photo-modal-is-shown class, which changes visibility to visible (may find a better way to do this)
        photoModal.classList.toggle('photo-modal-is-shown')
        
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