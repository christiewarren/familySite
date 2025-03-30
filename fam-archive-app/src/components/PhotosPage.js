import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'
import PhotoFilters from './PhotoFilters'
import PhotoSection from './PhotoSection'

export default function PhotosPage(){

    const dateRanges = ["2000-2050", "1950-2000", "1900-1950", "1850-1900"]

    const [allImagesToRender, setAllImagesToRender] = React.useState(images.sort((a,b) => parseInt(b.dateSpecific) - parseInt(a.dateSpecific)))

    const [selectedImage, setSelectedImage] = React.useState(allImagesToRender[0])
    
    const [isModalVisible, setIsModalVisible] = React.useState(false)

    function openPhotoModal(image){
        //receive selected image object, and update the state of selectedImage to that object
        setSelectedImage(image)

        //when thumbnail is clicked: toggle modal visibility (to open)
        togglePhotoModal()

        //when modal is open, pass the selected index to the setArrowButtonsDisabled function to determine whether to disable either prev/next button
        // setArrowButtonsDisabled(imagesToRender.indexOf(image))
    }

    function togglePhotoModal(){
        //toggle state of isModalVisible (which determines the visible/hidden class on the component) explanation on PR: https://github.com/christiewarren/familySite/pull/1#discussion_r1416641715
        setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible)
    }

    //for each range in the dateRanges array, render a photo section that's filtered by the given range
    const dateSections = dateRanges.map(range => {

        let filteredImages = []

        //if the section filter type is person, filter the images to only include ones with that person in them
        //if the section filter type is date, filter the images to only include ones with the given date (aka time)
        // if(props.filterType == "person"){
        //     filteredImages = images.filter((image) => image.people.includes(props.filterBy))
        // }else if(props.filterType == "date"){
        // }
    
        //sorts full image array in descending order based on dateSpecific i.e. newer years show first
        // imagesToRender.sort((a,b) => parseInt(b.dateSpecific) - parseInt(a.dateSpecific))

        filteredImages = allImagesToRender.filter((image) => image.time == range)


        return(
            <PhotoSection 
                filterType="date"
                filterBy={range}
                key={range}
                openPhotoModal={openPhotoModal}
                filteredImages = {filteredImages}
            />  
        )
        
    })



    

    
    return(
        <div>
            {dateSections}  
            <PhotoModal
            // pass the selected image object
            selectedImage = {selectedImage}
            setSelectedImage = {setSelectedImage}
            //pass the  modal toggle function to close the modal when x and overlay are clicked
            toggleModalFunction = {togglePhotoModal}
            //pass state of isModalVisible as a boolean to determine which className photo modal has (photo-modal-is-visible or photo-modal-is-hidden)
            isModalVisible = {isModalVisible}
            allImagesToRender={allImagesToRender}
            />          
        </div>
    )
}