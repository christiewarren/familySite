import React from 'react'

export default function PhotoModal(){
    return(
        <div className='photo-modal-overlay-wrap'>
            <div className='photo-modal'>
                <div className='photo-modal-img-wrap'>
                    <img src={require('../assets/ewarren_child.jpeg')} className='photo-modal-img'/>
                </div>
                <div id='details-panel' className='photo-modal-detail-wrap'>
                    <div className='photo-detail-text-wrap'>
                        <div className='photo-detail-group'>
                            <h3>Date</h3>
                            <p>1940</p>
                        </div>
                        <div className='photo-detail-group'>
                            <h3>Place</h3>
                            <p>Place name</p>
                        </div>
                        <div className='photo-detail-group'>
                            <h3>People</h3>
                            <a href='#'>Person 1</a><br/>
                            <a href='#'>Person 2</a><br/>
                            <a href='#'>Person 3</a><br/>
                        </div>
                        <div className='photo-detail-group'>
                            <h3>Album</h3>
                            <a href='#'>Album Name</a>
                        </div>
                    </div>
                </div>
                <button onClick={togglePhotoModalDetails} className='photo-modal-expand-collapse-btn'>Collapse details</button>
            </div>
        </div>
    )
}

function togglePhotoModalDetails(){
    let detailsPanel = document.getElementById('details-panel')

    detailsPanel.classList.toggle('panel-is-closed')

}