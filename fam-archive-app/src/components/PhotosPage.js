import React, { useEffect } from 'react'
import images from '../data/imageData.json'
import PhotoModal from './PhotoModal'
import PhotoSection from './PhotoSection'
import { useSearchParams, useParams } from 'react-router-dom';

export default function PhotosPage(props){

    //sorts full image array in descending order based on dateSpecific i.e. newer years show first
    const [allImagesToRender, setAllImagesToRender] = React.useState(images.sort((a,b) => b.dateSpecific - a.dateSpecific))

    const [searchParams, setSearchParams] = useSearchParams();

    const isModalOpenParam = searchParams.get('modal')
    
    const [isModalVisible, setIsModalVisible] = React.useState(isModalOpenParam)


    // const [personFirstName, personLastName] = name.split('-')
    // const person = people.find((person) => person.fullName == personFirstName + ' ' + personLastName)

    let filteredImages = []
    let sectionTitle = ''

    const sections = props.filterDetails.sections.map(section => {
        // if the section filter type is person, filter the images to only include ones with that person in them
        // if the section filter type is date, filter the images to only include ones with the given date (aka time)
        if(props.filterDetails.filterType == "person"){
            filteredImages = images.filter((image) => image.people.includes(section))
            sectionTitle = 'Photos of ' + section
        }else if(props.filterDetails.filterType == "date"){
            if(section == "1850-1900"){
                filteredImages = allImagesToRender.filter((image) => image.dateSpecific <= 1900)
            }else if(section == "1900-1950"){
                filteredImages = allImagesToRender.filter((image) => 1900 < image.dateSpecific && image.dateSpecific <= 1950)
            }else if(section == "1950-2000"){
                filteredImages = allImagesToRender.filter((image) => 1950 < image.dateSpecific && image.dateSpecific <= 2000)
            }else if(section == "2000-2050"){
                filteredImages = allImagesToRender.filter((image) => 2000 < parseInt(image.dateSpecific))
            }
            
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

    const photoSet = props.filterDetails.isFiltered ? filteredImages : allImagesToRender

    
    const imageParam = searchParams.get('image') 
    const openImage = photoSet.find((image) => image.filename == imageParam)
        
    const [selectedImage, setSelectedImage] = React.useState(props.isModalOpenParam ? openImage : allImagesToRender[0])


    function openPhotoModal(image){
        setSearchParams({modal: true, image: image.filename});

        //receive selected image object, and update the state of selectedImage to that object
        setSelectedImage(image)

        //when thumbnail is clicked: toggle modal visibility (to open)
        togglePhotoModal()
    }

    function togglePhotoModal(){
        isModalVisible && setSearchParams({});

        //toggle state of isModalVisible (which determines the visible/hidden class on the component) explanation on PR: https://github.com/christiewarren/familySite/pull/1#discussion_r1416641715
        setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible)
    }

  
    
    
    return(
        <div className='photos-page'>
            {sections}  
            {isModalOpenParam && <PhotoModal
            // pass the selected image object
            selectedImage = {selectedImage}
            setSelectedImage = {setSelectedImage}
            //pass the  modal toggle function to close the modal when x and overlay are clicked
            togglePhotoModal = {togglePhotoModal}
            //pass state of isModalVisible as a boolean to determine which className photo modal has (photo-modal-is-visible or photo-modal-is-hidden)
            isModalVisible = {isModalVisible}
            // setArrowButtonsDisabled={setArrowButtonsDisabled}
            isPrevButtonDisabled={photoSet.indexOf(selectedImage) == 0}
            isNextButtonDisabled={photoSet.indexOf(selectedImage) == photoSet.length - 1}
            photoSet={photoSet}
            setSearchParams={setSearchParams}
            />}          
        </div>
    )
}