import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'
import PhotoFilters from './PhotoFilters'
import PhotoSection from './PhotoSection'

export default function PhotosPage(){

    const dateRanges = ["1900-1950", "1950-2000"]

    //for each range in the dateRanges array, render a photo section that's filtered by the given range
    const dateSections = dateRanges.map(range => {
        return(
            <PhotoSection 
                filterType="date"
                filterBy={range}
            />  
        )
        
    })
    return(
        <div>
            {dateSections}            
        </div>
    )
}