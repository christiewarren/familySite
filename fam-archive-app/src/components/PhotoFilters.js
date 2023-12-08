import React from "react";

export default function PhotoFilters(props){
    return(
        <div>
            <input type="checkbox" name="document" onClick={() => props.filterClickFunction('document')}/>
            <label for="document">Document</label>
        </div>
    )
}