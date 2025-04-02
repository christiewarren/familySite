import React from "react";

export default function PhotoFilters(props){

    const closeX = "https://lanefamilysite.s3.us-east-2.amazonaws.com/close-x.svg"

    function handleChange(event) {
        const docCheckbox = document.getElementById('doc-checkbox').checked
        const photoCheckbox = document.getElementById('photo-checkbox').checked
        props.toggleFilter(docCheckbox, photoCheckbox)

    }

    return(
        <div className="filter-drawer">
            <img src={closeX} className="filter-close-x"></img>
            <div className="filter-group">
                <h4>Sort by</h4>
                <div className='filter-wrap'>
                    <input type="radio" name="document" id='least-recent-radio' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="least-recent-radio" className="filter-label"><p>Least recent</p></label>
                </div>
                <div className='filter-wrap'>
                <input type="radio" name="photo" id='most-recent-radio' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="most-recent-radio" className="filter-label"><p>Most recent</p></label>
                </div>
            </div>
            <div className="filter-group">
                <h4>Category</h4>
                <div className='filter-wrap'>
                    <input type="checkbox" name="document" id='doc-checkbox' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="doc-checkbox" className="filter-label"><p>Document</p></label>
                </div>
                <div className='filter-wrap'>
                <input type="checkbox" name="photo" id='photo-checkbox' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="photo-checkbox" className="filter-label"><p>1800-1849</p></label>
                </div>
            </div>
            <div className="filter-group">
                <h4>Time period</h4>
                <div className='filter-wrap'>
                    <input type="checkbox" name="document" id='1800-1849-checkbox' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="1800-1849-checkbox" className="filter-label"><p>Least recent</p></label>
                </div>
                <div className='filter-wrap'>
                    <input type="checkbox" name="photo" id='1850-1899-checkbox' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="1850-1899-checkbox" className="filter-label"><p>1850-1899</p></label>
                </div>
                <div className='filter-wrap'>
                    <input type="checkbox" name="photo" id='1900-1949-checkbox' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="1900-1949-checkbox" className="filter-label"><p>1900-1949</p></label>
                </div>
                <div className='filter-wrap'>
                    <input type="checkbox" name="photo" id='1950-1999-checkbox' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="1950-1999-checkbox" className="filter-label"><p>1950-1999</p></label>
                </div>
                <div className='filter-wrap'>
                    <input type="checkbox" name="photo" id='2000-present-checkbox' onChange={handleChange} className="filter-input"/>
                    <label htmlFor="1950-1999-checkbox" className="filter-label"><p>2000-present</p></label>
                </div>
            </div>
        </div>
    )
}