import React from 'react'
import images from '../data/imageData.json'
import Thumbnail from './Thumbnail'

export default function PhotoGrid(){
    const cards = images.map(image => {
        // {console.log(image)}
        return(
            <div className={'card ' + image.orientation}>
                <Thumbnail
                src={image.filename}
                key={image.title}
                />
                {image.title && <div className='doc-title-bar'><p>{image.title}</p></div>}
            </div>
        )
      })
    return(
        <div className='photo-grid'>
            {cards}
        </div>
    )
}