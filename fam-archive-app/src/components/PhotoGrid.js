import React from 'react'
import images from '../data/images'
import Thumbnail from './Thumbnail'

export default function PhotoGrid(){
    const cards = images.map(image => {
        return(
            <div className={'card ' + image.orientation}>
                <Thumbnail
                src={image.src}
                key={image.id}
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