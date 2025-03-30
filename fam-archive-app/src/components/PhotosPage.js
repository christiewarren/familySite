import React, { useEffect } from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'
import PhotoFilters from './PhotoFilters'
import PhotoSection from './PhotoSection'

export default function PhotosPage(props){

    //sorts full image array in descending order based on dateSpecific i.e. newer years show first
    const [allImagesToRender, setAllImagesToRender] = React.useState(images.sort((a,b) => parseInt(b.dateSpecific) - parseInt(a.dateSpecific)))

    const [selectedImage, setSelectedImage] = React.useState(allImagesToRender[0])
    
    const [isModalVisible, setIsModalVisible] = React.useState(false)

    let filteredImages = []
    let sectionTitle = ''
    
    const sections = props.sections.map(section => {
        // if the section filter type is person, filter the images to only include ones with that person in them
        // if the section filter type is date, filter the images to only include ones with the given date (aka time)
        if(props.filterType == "person"){
            filteredImages = images.filter((image) => image.people.includes(section))
            sectionTitle = 'Photos of ' + section
        }else if(props.filterType == "date"){
            filteredImages = allImagesToRender.filter((image) => image.time == section)
            sectionTitle = section
        }

        return(
            <PhotoSection 
                key={section}
                openPhotoModal={openPhotoModal}
                filteredImages = {filteredImages}
                sectionTitle={sectionTitle}
            />  
        )
        
    })

    function openPhotoModal(image){
        //receive selected image object, and update the state of selectedImage to that object
        setSelectedImage(image)

        //when thumbnail is clicked: toggle modal visibility (to open)
        togglePhotoModal()

        //when modal is open, pass the selected index to the setArrowButtonsDisabled function to determine whether to disable either prev/next button
        setArrowButtonsDisabled(allImagesToRender.indexOf(image))
    }

    function togglePhotoModal(){
        //toggle state of isModalVisible (which determines the visible/hidden class on the component) explanation on PR: https://github.com/christiewarren/familySite/pull/1#discussion_r1416641715
        setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible)
    }

    function setArrowButtonsDisabled(selectedIndex){
        //isFirstImage and isLastImage are booleans that check if the selected index is 0 or one less than the length of images array, respectively. the disabled attribute of each button is set to the boolean of the respective case: so if the selected image is the first image, prevModalButton will be disabled
        const prevModalButton = document.getElementById('prev-photo-button')
        const nextModalButton = document.getElementById('next-photo-button')
        let isFirstImage = selectedIndex == 0
        let isLastImage = selectedIndex == allImagesToRender.length - 1

        prevModalButton.disabled = isFirstImage
        nextModalButton.disabled = isLastImage
    }
    
    
    return(
        <div>
            {sections}  
            <PhotoModal
            // pass the selected image object
            selectedImage = {selectedImage}
            setSelectedImage = {setSelectedImage}
            //pass the  modal toggle function to close the modal when x and overlay are clicked
            toggleModalFunction = {togglePhotoModal}
            //pass state of isModalVisible as a boolean to determine which className photo modal has (photo-modal-is-visible or photo-modal-is-hidden)
            isModalVisible = {isModalVisible}
            allImagesToRender={allImagesToRender}
            setArrowButtonsDisabled={setArrowButtonsDisabled}
            />          
        </div>
    )
}