import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'

export default function PhotoGrid(){
    const cards = images.map(image => {
        // {console.log(image)}
        return(
            <div className={'card ' + image.orientation}>
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

    const [isModalVisible, setIsModalVisible] = React.useState(false)


    function openPhotoModal(image){
        //receive selected image object, and update the state of selectedImage to that object
        setSelectedImage(image)

        //when thumbnail is clicked: toggle modal visibility (to open)
        togglePhotoModal()
    }

    function togglePhotoModal(){
        //toggle modal visibility and state of visibility
        const photoModal = document.getElementById('photo-modal')
        setIsModalVisible((prevIsModalVisible) => {
            console.log(prevIsModalVisible)
            if(prevIsModalVisible){
                photoModal.style.visibility = 'hidden'
            }else{
                photoModal.style.visibility = 'visible'
            }
            return !prevIsModalVisible
        })
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
            //change function to be used with next/prev
            changeFunction = {changeModalImage}
            // pass the selected image object
            image = {selectedImage}
            //pass the  modal toggle function to close the modal when x and overlay are clicked
            toggleModalFunction = {togglePhotoModal}
        />
    </div>

    )
}