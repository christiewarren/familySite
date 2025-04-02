import React from 'react';
import noPhotoFound from '../assets/no-photo-found.svg'

export default function Thumbnail(props){

    //return require(src) if possible. otherwise, return the no photo found image
    // const tryRequire = (path) => {
    //     try {
    //      return require('../assets/' + path + '.jpg');
    //     } catch (err) {
    //      return noPhotoFound;
    //     }
    //   }

    return(
        <img 
        src={"https://lanefamilysite.s3.us-east-2.amazonaws.com/" + props.src + ".jpg"} 
        alt={props.alt}
        className='thumbnail' 
        onClick={props.openPhotoModal}
        />
    )
}

