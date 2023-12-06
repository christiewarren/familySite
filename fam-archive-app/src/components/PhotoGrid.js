import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'

export default function PhotoGrid(){
    const cards = images.map(image => {
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

        //when modal is open, pass the selected index to the checkForFirstLastImage function to determine whether to disable either prev/next button
        checkForFirstLastImage(images.indexOf(image))
    }

    function togglePhotoModal(){
        //toggle modal visibility and state of visibility
        const photoModal = document.getElementById('photo-modal')
        setIsModalVisible((prevIsModalVisible) => {
            if(prevIsModalVisible){
                photoModal.style.visibility = 'hidden'
            }else{
                photoModal.style.visibility = 'visible'
            }
            return !prevIsModalVisible
        })
    }

    function changeModalImage(nextOrPrev){
        //if previous/next is passed in, update state of selected image object to the image object at the index before/after it. also call the checkForFirstLastImage function with the new selected index to determine whether to disable either prev/next button
        setSelectedImage((prevSelectedImage) => {
            let prevSelectedIndex = images.indexOf(prevSelectedImage)

            if(nextOrPrev == 'previous'){
                checkForFirstLastImage(prevSelectedIndex - 1)
                return images[prevSelectedIndex - 1]
            }  else{
                checkForFirstLastImage(prevSelectedIndex + 1)
                return images[prevSelectedIndex + 1]
            }
        })

        
    }

    function checkForFirstLastImage(selectedIndex){
        //check if the selected index is the first or last, and set prev/next button to disabled respectively. otherwise, set both to not disabled
        const prevModalButton = document.getElementById('prev-photo-button')
        const nextModalButton = document.getElementById('next-photo-button')

        if(selectedIndex == 0){
            prevModalButton.disabled = true
        }else if(selectedIndex == images.length - 1){
            nextModalButton.disabled = true
        }else{
            prevModalButton.disabled = false
            nextModalButton.disabled = false
        }
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