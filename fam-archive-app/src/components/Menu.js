import React from "react";

export default function Menu(props){
    return(
        <div className="menu-wrap">
            <select name="pages" id="page-select">
                <option value="all photos">All Photos</option>
                <option value="albums">Albums</option>
                <option value="stories">Stories</option>
                <option value="people">People</option>
            </select>
        </div>
    )
}