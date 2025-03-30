import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'
import PhotoFilters from './PhotoFilters'
import PhotoGrid from './PhotoGrid'

//PhotoGrid is a component within photoSection
    //the Section component passes a filtered subset of photos to the PhotoGrid based on [date, person, etc]
    //for Person page, render a Section with photos of {person}
    //for main grid, render a Section for each date range in a date range array (hard coded based on our photos)
      //find middle of date range and categorize image based on that year


export default function PhotoSection(props){

    return(
        <div>
            <div className='date-divider-wrap'><h3 className='date-divider-title'>{props.filterBy}</h3><hr className='date-divider-line'></hr></div>
            <PhotoGrid 
                filteredImages={props.filteredImages}
                openPhotoModal={props.openPhotoModal}
            />
            
        </div>
    )
}