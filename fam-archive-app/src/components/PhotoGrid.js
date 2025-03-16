import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'
import PhotoFilters from './PhotoFilters'

export default function PhotoGrid(){
    const [shownImages, setShownImages] = React.useState(images)
    
    const cards = shownImages.map(image => {
        return(
            <div className={'card ' + image.orientation} key={image.filename}>
                <Thumbnail
                src={image.filename}
                key={image.filename}

                //onclick, pass in the image object at this thumbnail's index
                openPhotoModal={() => openPhotoModal(image)}
                />
                {image.type == "document" && <div className='doc-title-bar'><small>{image.title}</small></div>}
            </div>
        )
        })

    function toggleFilter(docCheckbox, photoCheckbox){
        setShownImages(() => {

            // create new array. look at each image in images: 
            // if docCheckbox is false(unchecked), add the image (so all images will be added) OTHERWISE if docCheckbox is true(checked) only add the image if its type is document. 
            // ALSO 
            // if photoCheckbox is false(unchecked), add the image (so all images will be added) OTHERWISE if photoCheckbox is true(checked) only add the image if its type is photo.
            // OTHERWISE
            // if docCheckbox AND photoCheckbox are both true (checked), add image if its type is photo OR document.
            
            //Note: can try making a table like this to further investigate:
            // docChecbox isDoc photoCheckbox isPhoto
            // FALSE      FLASE  FLAE         FALSE
            // FALSE      FALSE FALSE          TRUE
            let filteredImages = images.filter((image) => 
            (!docCheckbox || image.type == 'document') && 
            (!photoCheckbox || image.type == 'photo') || 
            ((docCheckbox && photoCheckbox) && (image.type == 'photo' || image.type == 'document')))

            return filteredImages
            
        })
    }
    
    
    //create state for selected image object and set it to the first image object in the array
    const [selectedImage, setSelectedImage] = React.useState(shownImages[0])

    const [isModalVisible, setIsModalVisible] = React.useState(false)


    function openPhotoModal(image){
        //receive selected image object, and update the state of selectedImage to that object
        setSelectedImage(image)

        //when thumbnail is clicked: toggle modal visibility (to open)
        togglePhotoModal()

        //when modal is open, pass the selected index to the setArrowButtonsDisabled function to determine whether to disable either prev/next button
        setArrowButtonsDisabled(shownImages.indexOf(image))
    }

    function togglePhotoModal(){
        //toggle state of isModalVisible (which determines the visible/hidden class on the component) explanation on PR: https://github.com/christiewarren/familySite/pull/1#discussion_r1416641715
        setIsModalVisible((prevIsModalVisible) => !prevIsModalVisible)
    }

    function changeModalImage(nextOrPrev){
        //if previous/next is passed in, update state of selected image object to the image object at the index before/after it. also call the setArrowButtonsDisabled function with the new selected index to determine whether to disable either prev/next button
        setSelectedImage((prevSelectedImage) => {
            let prevSelectedIndex = shownImages.indexOf(prevSelectedImage)

            if(nextOrPrev == 'previous'){
                setArrowButtonsDisabled(prevSelectedIndex - 1)
                return shownImages[prevSelectedIndex - 1]
            }  else{
                setArrowButtonsDisabled(prevSelectedIndex + 1)
                return shownImages[prevSelectedIndex + 1]
            }
        })

    }

    function setArrowButtonsDisabled(selectedIndex){
        //isFirstImage and isLastImage are booleans that check if the selected index is 0 or one less than the length of images array, respectively. the disabled attribute of each button is set to the boolean of the respective case: so if the selected image is the first image, prevModalButton will be disabled
        const prevModalButton = document.getElementById('prev-photo-button')
        const nextModalButton = document.getElementById('next-photo-button')
        let isFirstImage = selectedIndex == 0
        let isLastImage = selectedIndex == shownImages.length - 1

        prevModalButton.disabled = isFirstImage
        nextModalButton.disabled = isLastImage
    }

    return(
    <div>
        <div className='photo-grid-wrap'>
        <PhotoFilters 
            //when filter is  clicked, shownImages gets filtered
            toggleFilter = {toggleFilter}
            //when checkbox is clicked, state of isFilterChecked gets toggled
            // toggleDocCheckbox = {toggleDocCheckbox}
            // togglePhotoCheckbox = {togglePhotoCheckbox}
        />
            <h2>1900 - 1950</h2>
            <div className='photo-grid'>
                {cards}
                </div>
        </div>
        <PhotoModal
            //change function to be used with next/prev
            changeFunction = {changeModalImage}
            // pass the selected image object
            image = {selectedImage}
            //pass the  modal toggle function to close the modal when x and overlay are clicked
            toggleModalFunction = {togglePhotoModal}
            //pass state of isModalVisible as a boolean to determine which className photo modal has (photo-modal-is-visible or photo-modal-is-hidden)
            isModalVisible = {isModalVisible}
        />
    </div>

    )
}

// isDocumentChecked => image.type === 'document'
// not isDocumentChecked => not image.type === document
// filters = {
//     document: {
//         value: true,
//         filterFunction: image => image.type === 'document'
//     }
// }
// filters[filterKey].value = !ilters[filterKey].value
// images.filter(image => {
//     return filters.values().every(
//         filter => filter.value ? filter.filterFunction(image) : !filter.filterFunction(image)
//     );
// })
// filters.values

// isDocumentChecked ? image.type === 'document' : image.type !== 'document'

//     images.filter(image => !Boolean(isDocumentChecked ^ image.type === 'document') && !Boolean(isPhotoChecked ^ image.type === 'photo'))