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

                //onclick, pass in the image object at this thumbnail's index
                clickFunction={() => openPhotoModal(image)}
                />
                {image.type == "document" && <div className='doc-title-bar'><p>{image.title}</p></div>}
            </div>
        )
        })
    
    //create state for selected image object and set it to the first image object in the array
    const [selectedImage, setSelectedImage] = React.useState(images[0])

    const [modalVisibility, setModalVisibility] = React.useState(false)


    function openPhotoModal(image){
        //receive selected image object, and update the state of selectedImage to that object
        setSelectedImage(image)

        //when thumbnail is clicked: toggle modal-is-shown class
        togglePhotoModal()
        addOverlayListener()
    }

    function togglePhotoModal(){
        //toggle photo-modal-is-shown class, which changes visibility to visible (may find a better way to do this)
        const photoModal = document.getElementById('photo-modal')
        setModalVisibility((prevIsModalShown) => {
            console.log(prevIsModalShown)
            if(prevIsModalShown){
                photoModal.style.visibility = 'hidden'
            }else{
                photoModal.style.visibility = 'visible'
            }
            return !prevIsModalShown
        })

        
        
    }

    function addOverlayListener(){
        //add event listener to overlay to close modal when clicked
        let photoModalOverlay = document.getElementById('photo-modal-overlay')
        photoModalOverlay.addEventListener('click', closePhotoModal)
    }

    function addXListener(){
        //add event listener to x button to close modal when clicked
        let photoModalXButton = document.getElementById('close-modal-button')
        photoModalXButton.addEventListener('click', closePhotoModal)
    }

    function closePhotoModal(){
        togglePhotoModal()
        addXListener()

        //problem: console always logs clicked when overlay is clicked, but modal doesnt disappear. Class highlights in dev mode, but doesn't turn off 
        // console.log('clicked')

        //when overlay or x is clicked: toggle modal-is-shown-class (to hide modal)
    }

    function changeModalImage(nextOrPrev){
        // console.log('clicked ' + nextOrPrev)
        // if(nextOrPrev == 'prev'){
        //     setSelectedImageIndex((prevSelectedImageIndex) => prevSelectedImageIndex - 1)
        // }else{
        //     setSelectedImageIndex((prevSelectedImageIndex) => prevSelectedImageIndex + 1)
        // }
        
    }

    return(
        <div>
        <div className='photo-grid'>
            {cards}
        </div>
        <PhotoModal
        // render PhotoModal and pass it the selected image object
        //change function to be used with next/prev
            changeFunction = {changeModalImage}
            image = {selectedImage}
        />
    </div>

    )
}