import React from 'react';

export default function Thumbnail(props){
    return(
        <img src={require('../assets/' + props.src)} className='thumbnail' onClick={props.clickFunction}/>
    )
}

