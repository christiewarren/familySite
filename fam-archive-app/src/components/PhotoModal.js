import React from 'react'
import closeX from '../assets/close-x.svg'
import leftArrow from '../assets/left-arrow.svg'
import rightArrow from '../assets/right-arrow.svg'
import { Link } from 'react-router-dom'
import people from '../data/peopleData.json'
import PeopleList from './PeopleList'
import noPhotoFound from '../assets/no-photo-found.svg'

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

    const placeList = props.image.place ? props.image.place.map(place => {
        return(
            <p key={props.image.filename + place}>{place}</p>
        )
    }) : ''

    console.log(placeList)
    
    //return require(src) if possible. otherwise, return the no photo found image. also done in Thumbnail, so maybe can be more reusable
    const tryRequireModalPhoto = (path) => {
        try {
         return require('../assets/' + path + '.jpg');
        } catch (err) {
        console.log(err);
         return noPhotoFound;
        }
      }

    
    //return require(src) if possible. otherwise, return empty string (def a better way to catch missing pdfs)
    const tryRequirePDFLink = (path) => {
        try {
        return require('../assets/pdfs/' + path + '.pdf');
        } catch (err) {
        return "";
        }
    }


    return(
        <div className={'photo-modal-wrap ' + (props.isModalVisible ? 'photo-modal-is-visible' : 'photo-modal-is-hidden')}>
            {/* when modal x is clicked, run the click function passed in, which is togglePhotoModal */}
            <div onClick={props.toggleModalFunction} id='close-modal-button'>
                <img src={closeX}></img>
            </div>
            {/* when modal overlay is clicked, run the click function passed in, which is togglePhotoModal */}
            <div onClick={props.toggleModalFunction} className='photo-modal-overlay'></div>
            <div className='photo-modal'>
                <img 
                    src={tryRequireModalPhoto(props.image.filename)}
                    alt={props.image.title} 
                    className='photo-modal-img' 
                    id='photo-modal-img'/>
                <div id='details-panel' className='photo-modal-detail-wrap'>
                    <div className='photo-detail-text-wrap'>
                        <div className='photo-detail-group'>
                            <h4>Date</h4>
                            <p>{props.image.time}</p>
                        </div>
                        <div className='photo-detail-group'>
                            <h4>Place</h4>
                            {props.image.place && placeList}
                        </div>
                        <div className='photo-detail-group'>
                            <PeopleList 
                                title='people'
                                contents={props.image.people}
                            />
                        </div>
                        {/* <div className='photo-detail-group'>
                            <h4>Album</h4>
                            <a className='link' href='#'>Album Name</a>
                        </div> */}
                    </div>
                    {/* If the photo's hasPDF property is true, add a link to the PDF */}
                    {props.image.hasPDF == "TRUE" && 
                        <a className='button-primary' href={tryRequirePDFLink(props.image.filename)} target='_BLANK'>View full PDF&nbsp;&nbsp;<img src={rightArrow}></img></a>
                    }
                
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
