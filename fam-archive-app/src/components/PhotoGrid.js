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
                clickFunction={openPhotoModal}
                />
                {image.type == "document" && <div className='doc-title-bar'><p>{image.title}</p></div>}
            </div>
        )
        })

    function openPhotoModal(){
        let photoModal = document.getElementById('photo-modal')
        console.log(photoModal)

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