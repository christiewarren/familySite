import React from 'react'
import PhotoGrid from './PhotoGrid'

//PhotoGrid is a component within photoSection
    //the Section component passes a filtered subset of photos to the PhotoGrid based on [date, person, etc]
    //for Person page, render a Section with photos of {person}
    //for main grid, render a Section for each date range in a date range array (hard coded based on our photos)
      //find middle of date range and categorize image based on that year


export default function PhotoSection(props){


    return(
        <div id={props.sectionTitle} className={'section-wrap' + (props.index == 0 ? ' first-section' : '')}>
            <div className='date-divider-wrap'><h3 className='date-divider-title'>{props.sectionTitle}</h3><hr className='date-divider-line'></hr></div>
            <PhotoGrid 
                filteredImages={props.filteredImages}
                openPhotoModal={props.openPhotoModal}
            />
            
        </div>
    )
}