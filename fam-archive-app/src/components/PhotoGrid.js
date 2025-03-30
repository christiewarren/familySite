import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'
import PhotoFilters from './PhotoFilters'

export default function PhotoGrid(props){
    const cards = props.filteredImages.map(image => {
        return(
            //TO DO: if image.date is within x range, create a card with y id. create a card section for each id and put the respective images in it
            <div className={'card ' + image.orientation} key={image.filename}>
                <Thumbnail
                src={image.filename}
                key={image.filename}
                alt={image.title}

                //onclick, pass in the image object at this thumbnail's index
                openPhotoModal={() => props.openPhotoModal(image)}
                />
                {image.type == "document" && <div className='doc-title-bar'><small>{image.title}</small></div>}
            </div>
        )
        })

    // function toggleFilter(docCheckbox, photoCheckbox){
    //     setShownImages(() => {

    //         // create new array. look at each image in images: 
    //         // if docCheckbox is false(unchecked), add the image (so all images will be added) OTHERWISE if docCheckbox is true(checked) only add the image if its type is document. 
    //         // ALSO 
    //         // if photoCheckbox is false(unchecked), add the image (so all images will be added) OTHERWISE if photoCheckbox is true(checked) only add the image if its type is photo.
    //         // OTHERWISE
    //         // if docCheckbox AND photoCheckbox are both true (checked), add image if its type is photo OR document.
            
    //         //Note: can try making a table like this to further investigate:
    //         // docChecbox isDoc photoCheckbox isPhoto
    //         // FALSE      FLASE  FLAE         FALSE
    //         // FALSE      FALSE FALSE          TRUE
    //         let filteredImages = images.filter((image) => 
    //         (!docCheckbox || image.type == 'document') && 
    //         (!photoCheckbox || image.type == 'photo') || 
    //         ((docCheckbox && photoCheckbox) && (image.type == 'photo' || image.type == 'document')))

    //         return filteredImages
            
    //     })
    // }
    
    
    //create state for selected image object and set it to the first image object in the array
    

    return(
    <div>
        <div className='photo-grid-wrap'>
        {/* <PhotoFilters 
            //when filter is  clicked, shownImages gets filtered
            toggleFilter = {toggleFilter}
            //when checkbox is clicked, state of isFilterChecked gets toggled
            // toggleDocCheckbox = {toggleDocCheckbox}
            // togglePhotoCheckbox = {togglePhotoCheckbox}
        /> */}
            <div className='photo-grid'>
                {cards}
            </div>
        </div>
        
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