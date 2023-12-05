import React from 'react'
import closeX from '../assets/close-x.svg'
import leftArrow from '../assets/left-arrow.svg'
import rightArrow from '../assets/right-arrow.svg'

export default function PhotoModal(props){

    const [detailsPanelBtnText, setDetailsPanelBtnText] = React.useState('Collapse')

    function togglePhotoModalDetails(){
        let detailsPanel = document.getElementById('details-panel')
        
        // toggle button text between exand and collapse
        if (detailsPanelBtnText === 'Collapse'){
            setDetailsPanelBtnText('Expand')
        } else{
            setDetailsPanelBtnText('Collapse')
        }

        //toggle panel-is-closed class, which adds negative margin and removes padding
        detailsPanel.classList.toggle('panel-is-closed')
    }

    const peopleList = props.image.people.map(person => {
        return(
            <a href='#' className='photo-person-link'>{person}</a>
        )
        
    })

    const placeList = props.image.place.map(place => {
        return(
            <p>{place}</p>
        )
    })

    return(
        <div className='photo-modal-wrap' id='photo-modal'>
            <div id='close-modal-button'>
                <img src={closeX}></img>
            </div>
            <div id='photo-modal-overlay' className='photo-modal-overlay'></div>
            <div className='photo-modal'>
                <img src={require('../assets/' + props.image.filename)} className='photo-modal-img' id='photo-modal-img'/>
                <div id='details-panel' className='photo-modal-detail-wrap'>
                    <div className='photo-detail-text-wrap'>
                        <div className='photo-detail-group'>
                            <h3>Date</h3>
                            <p>{props.image.date}</p>
                        </div>
                        <div className='photo-detail-group'>
                            <h3>Place</h3>
                            {placeList}
                        </div>
                        <div className='photo-detail-group'>
                            <h3>People</h3>
                            {peopleList}
                        </div>
                        <div className='photo-detail-group'>
                            <h3>Album</h3>
                            <a href='#'>Album Name</a>
                        </div>
                    </div>
                </div>
                <button onClick={togglePhotoModalDetails} className='photo-modal-expand-collapse-btn'>{detailsPanelBtnText} details</button>
            </div>
            <div className='next-prev-button-position-wrap'>
                <div className='next-prev-button-bg-wrap'>
                    <button id='prev-photo-button' onClick={() => props.changeFunction('previous')}><img src={leftArrow}></img></button>
                    <button id='next-photo-button' onClick={() => props.changeFunction('next')}><img src={rightArrow}></img></button>
                </div>
            </div>
        </div>
    )
}
