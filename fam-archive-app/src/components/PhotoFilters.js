import React from "react";

export default function PhotoFilters(props){
    return(
        <div>
            <div className='filter-wrap'>
                <input type="checkbox" name="document" onClick={() => props.filterClickFunction('document')} onChange={props.toggleCheckboxFunction}/>
                <label for="document">Document</label>
            </div>
            <div className='filter-wrap'>
                <input type="checkbox" name="photo" onClick={() => props.filterClickFunction('photo')} onChange={props.toggleCheckboxFunction}/>
                <label for="photo">Photo</label>
            </div>
        </div>
    )
}