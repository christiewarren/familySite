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
    let filteredImages = []

    //if the section filter type is person, filter the images to only include ones with that person in them
    //if the section filter type is date, filter the images to only include ones with the given date (aka time)
    if(props.filterType == "person"){
        filteredImages = images.filter((image) => image.people.includes(props.filterBy))
    }else if(props.filterType == "date"){
        filteredImages = images.filter((image) => image.time == props.filterBy)
    }

    const [imagesToRender, setImagesToRender] = React.useState(filteredImages)

    return(
        <div>
            <div className='date-divider-wrap'><h3 className='date-divider-title'>{props.filterBy}</h3><hr className='date-divider-line'></hr></div>
            <PhotoGrid 
                imagesToRender={imagesToRender}
            />
        </div>
    )
}