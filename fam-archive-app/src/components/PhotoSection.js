import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'
import PhotoModal from './PhotoModal'
import PhotoFilters from './PhotoFilters'
import PhotoGrid from './PhotoGrid'

export default function PhotoSection(props){
    return(
        <div>
            <p>Photo section</p>
            <div className='date-divider-wrap'><h3 className='date-divider-title'>[insert name of filter]</h3><hr className='date-divider-line'></hr></div>
            <PhotoGrid />
        </div>
    )
}