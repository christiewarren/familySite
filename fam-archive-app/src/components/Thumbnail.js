import React from 'react';
import noPhotoFound from '../assets/no-photo-found.svg'

export default function Thumbnail(props){

    //return require(src) if possible. otherwise, return the no photo found image
    const tryRequire = (path) => {
        try {
         return require('../assets/' + path + '.jpg');
        } catch (err) {
         return noPhotoFound;
        }
      }

    return(
        <img 
        src={tryRequire(props.src)} 
        alt={props.alt}
        className='thumbnail' 
        onClick={props.openPhotoModal}
        />
    )
}

