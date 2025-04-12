import React from 'react';
import Link from "react-router-dom";


export default function Thumbnail(props){

    const noPhotoFound = "https://lanefamilysite.s3.us-east-2.amazonaws.com/no-photo-found.svg"

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
            src={"https://lanefamilysite.s3.us-east-2.amazonaws.com/thumbnails/low/" + props.src + "_low.jpg"} 
            alt={props.alt}
            className='thumbnail' 
            onClick={props.openPhotoModal}
            />
    )
}

