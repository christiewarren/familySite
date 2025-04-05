import React from 'react'
import { Link } from 'react-router-dom'
import people from '../data/peopleData.json'
import PeopleList from './PeopleList'

export default function PhotoModal(props){
    
    const noPhotoFound = "https://lanefamilysite.s3.us-east-2.amazonaws.com/no-photo-found.svg"
    const closeX = "https://lanefamilysite.s3.us-east-2.amazonaws.com/close-x.svg"
    const leftArrow = "https://lanefamilysite.s3.us-east-2.amazonaws.com/left-arrow.svg"
    const rightArrow = "https://lanefamilysite.s3.us-east-2.amazonaws.com/right-arrow.svg"

    const [detailsPanelBtnText, setDetailsPanelBtnText] = React.useState('Collapse')

    const [isDetailsPanelClosed, setIsDetailsPanelClosed] = React.useState(false)

    function togglePhotoModalDetails(){        

        // toggle button text between exand and collapse
        if (detailsPanelBtnText === 'Collapse'){
            setDetailsPanelBtnText('Expand')
        } else{
            setDetailsPanelBtnText('Collapse')
        }

        //toggle panel-is-closed class, which adds negative margin and removes padding
        setIsDetailsPanelClosed((prevIsDetailsPanelClosed) => !prevIsDetailsPanelClosed)
    }

    function changeModalImage(nextOrPrev){
    //if previous/next is passed in, update state of selected image object to the image object at the index before/after it. also call the setArrowButtonsDisabled function with the new selected index to determine whether to disable either prev/next button
        props.setSelectedImage((prevSelectedImage) => {
            let prevSelectedIndex = props.photoSet.indexOf(prevSelectedImage)

            if(nextOrPrev == 'previous'){
                // props.setArrowButtonsDisabled(prevSelectedIndex - 1)
                return props.photoSet[prevSelectedIndex - 1]
            }  else{
                // props.setArrowButtonsDisabled(prevSelectedIndex + 1)
                return props.photoSet[prevSelectedIndex + 1]
            }
        })

    }

    const placeList = props.selectedImage.place ? props.selectedImage.place.map(place => {
        return(
            <p key={props.selectedImage.filename + place}>{place}</p>
        )
    }) : ''

    
    //return require(src) if possible. otherwise, return the no photo found image. also done in Thumbnail, so maybe can be more reusable
    // const tryRequireModalPhoto = (path) => {
    //     try {
    //      return require('../assets/' + path + '.jpg');
    //     } catch (err) {
    //     console.log(err);
    //      return noPhotoFound;
    //     }
    //   }

    
    //return require(src) if possible. otherwise, return empty string (def a better way to catch missing pdfs)
    // const tryRequirePDFLink = (path) => {
    //     try {
    //     return require('../assets/pdfs/' + path + '.pdf');
    //     } catch (err) {
    //     return "";
    //     }
    // }

    return(
        <div className={'photo-modal-wrap ' + (props.isModalVisible ? 'photo-modal-is-visible' : 'photo-modal-is-hidden')}>
            {/* when modal x is clicked, run the click function passed in, which is togglePhotoModal */}
            <div onClick={props.togglePhotoModal} id='close-modal-button'>
                <img src={closeX}></img>
            </div>
            {/* when modal overlay is clicked, run the click function passed in, which is togglePhotoModal */}
            <div onClick={props.togglePhotoModal} className='photo-modal-overlay'></div>
            <div className='photo-modal'>
                <img 
                    src={"https://lanefamilysite.s3.us-east-2.amazonaws.com/" + props.selectedImage.filename + ".jpg"}
                    alt={props.selectedImage.title} 
                    className='photo-modal-img' 
                    id='photo-modal-img'/>
                <div id='details-panel' className={'photo-modal-detail-wrap' + (isDetailsPanelClosed ? ' panel-is-closed' : '')}>
                    <div className='photo-detail-text-wrap'>
                        <div className='photo-detail-group'>
                            <h4>Date</h4>
                            <p>{props.selectedImage.displayDate}</p>
                        </div>
                        <div className='photo-detail-group'>
                            <h4>Place</h4>
                            {props.selectedImage.place && placeList}
                        </div>
                        <div className='photo-detail-group'>
                            <PeopleList 
                                title='people'
                                contents={props.selectedImage.people}
                                isInModal={true}
                                togglePhotoModal={props.togglePhotoModal}
                            />
                        </div>
                        {/* <div className='photo-detail-group'>
                            <h4>Album</h4>
                            <a className='link' href='#'>Album Name</a>
                        </div> */}
                    </div>
                    {/* If the photo's hasPDF property is true, add a link to the PDF */}
                    {props.selectedImage.hasPDF == "TRUE" && 
                        <a className='button-primary' href={"https://lanefamilysite.s3.us-east-2.amazonaws.com/pdfs/" + props.selectedImage.filename + ".pdf"} target='_BLANK'>View full PDF&nbsp;&nbsp;<img src={rightArrow}></img></a>
                    }
                
                </div>
                <button onClick={togglePhotoModalDetails} className='photo-modal-expand-collapse-btn'>{detailsPanelBtnText} details</button>
            </div>
            <div className='next-prev-button-position-wrap'>
                <div className='next-prev-button-bg-wrap'>
                    <button id='prev-photo-button' onClick={() => changeModalImage('previous')} disabled={props.isPrevButtonDisabled}><img src={leftArrow}></img></button>
                    <button id='next-photo-button' onClick={() => changeModalImage('next')} disabled={props.isNextButtonDisabled}><img src={rightArrow}></img></button>
                </div>
            </div>
        </div>
    )
}
