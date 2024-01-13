import React from "react";

export default function PhotoFilters(props){

    function handleChange(event) {
        const docCheckbox = document.getElementById('doc-checkbox').checked
        const photoCheckbox = document.getElementById('photo-checkbox').checked
        props.toggleFilter(docCheckbox, photoCheckbox)

    }

    return(
        <div>
            <div className='filter-wrap'>
                <input type="checkbox" name="document" id='doc-checkbox' onChange={handleChange}/>
                <label for="document">Document</label>
            </div>
            <div className='filter-wrap'>
            <input type="checkbox" name="photo" id='photo-checkbox' onChange={handleChange}/>
                <label for="photo">Photo</label>
            </div>
        </div>
    )
}