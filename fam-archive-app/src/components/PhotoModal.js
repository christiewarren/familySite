import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import people from '../data/peopleData.json'
import PeopleList from './PeopleList'
import { useSearchParams, useParams } from 'react-router-dom'

export default function PhotoModal(props){
    
    const noPhotoFound = "https://lanefamilysite.s3.us-east-2.amazonaws.com/no-photo-found.svg"
    const closeX = "https://lanefamilysite.s3.us-east-2.amazonaws.com/close-x.svg"
    const leftArrow = "https://lanefamilysite.s3.us-east-2.amazonaws.com/left-arrow.svg"
    const rightArrow = "https://lanefamilysite.s3.us-east-2.amazonaws.com/right-arrow.svg"
    const linkIcon = "https://lanefamilysite.s3.us-east-2.amazonaws.com/link.svg"
    const checkIcon = "https://lanefamilysite.s3.us-east-2.amazonaws.com/check.svg"

    const [detailsPanelBtnText, setDetailsPanelBtnText] = React.useState('Collapse')

    const [isDetailsPanelClosed, setIsDetailsPanelClosed] = React.useState(false)

    const [searchParams, setSearchParams] = useSearchParams();

    const imageParam = searchParams.get('image') 
    const openImage = props.photoSet.find((image) => image.filename == imageParam)

    const [isLinkCopied, setIsLinkCopied] = React.useState(false)


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

    const [isImageLoaded, setIsImageLoaded] = React.useState(false)


    function changeModalImage(nextOrPrev){
        setIsImageLoaded(false)
        let prevSelectedIndex = props.photoSet.indexOf(openImage)

            if(nextOrPrev == 'previous'){
                props.setSearchParams({modal: true, image: props.photoSet[prevSelectedIndex - 1].filename})
                props.setSelectedImage(props.photoSet[prevSelectedIndex - 1])
            }  else{
                props.setSearchParams({modal: true, image: props.photoSet[prevSelectedIndex + 1].filename})
                props.setSelectedImage(props.photoSet[prevSelectedIndex + 1])
            }
    }

    const placeList = openImage.place ? openImage.place.map(place => {
        return(
            <p key={openImage.filename + place}>{place}</p>
        )
    }) : ''


    const url = "https://family-site-lake.vercel.app" + useLocation().pathname + useLocation().search

    function copyUrl(){  
        navigator.clipboard.writeText(url)
        setIsLinkCopied((prevIsLinkCopied) => !prevIsLinkCopied)
        setTimeout(() => {
            setIsLinkCopied((prevIsLinkCopied) => !prevIsLinkCopied)
          }, 2000);
    }

    return(
        <div className={'photo-modal-wrap ' + (props.isModalVisible ? 'photo-modal-is-visible' : 'photo-modal-is-hidden')}>
            {/* when modal x is clicked, run the click function passed in, which is togglePhotoModal */}
            <div onClick={props.togglePhotoModal} id='close-modal-button'>
                <img src={closeX}></img>
            </div>
            {/* when modal overlay is clicked, run the click function passed in, which is togglePhotoModal */}
            <div onClick={props.togglePhotoModal} className='photo-modal-overlay'></div>
            <div className='photo-modal'>
            {/* hide 500 image once full image is loaded */}
                <div className='modal-img-wrap'>
                    <img 
                        src={"https://lanefamilysite.s3.us-east-2.amazonaws.com/thumbnails/low/" + openImage.filename + "_low.jpg"}
                        alt={openImage.title} 
                        className={'photo-modal-img-500' + (isImageLoaded ? ' modal-image-500-is-hidden' : '')}
                        />
                    <img 
                        src={"https://lanefamilysite.s3.us-east-2.amazonaws.com/" + openImage.filename + ".jpg"}
                        alt={openImage.title} 
                        id='photo-modal-img'
                        onLoad={() => setIsImageLoaded(true)}
                        className={'photo-modal-img' + (isImageLoaded ? '' : ' modal-image-is-hidden')} 
                        />
                </div>
                
                <div id='details-panel' className={'photo-modal-detail-wrap' + (isDetailsPanelClosed ? ' panel-is-closed' : '')}>
                    <div className='photo-detail-text-wrap'>
                        <div className='photo-detail-group'>
                            <h4>Title</h4>
                            <p>{openImage.title}</p>
                            {openImage.hasPDF == "TRUE" && 
                            <a className='button-primary pdf-button' href={"https://lanefamilysite.s3.us-east-2.amazonaws.com/pdfs/" + openImage.filename + ".pdf"} target='_BLANK'>View full PDF&nbsp;&nbsp;<img src={rightArrow}></img></a>
                            }
                        </div>
                        <div className='photo-detail-group'>
                            <h4>Date</h4>
                            <p>{openImage.displayDate ? openImage.displayDate : openImage.dateStart + "-" + openImage.dateEnd}</p>
                        </div>
                        <div className='photo-detail-group'>
                            <h4>Place</h4>
                            {openImage.place && placeList}
                        </div>
                        <div className='photo-detail-group'>
                            <PeopleList 
                                title='people'
                                contents={openImage.people}
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
                    <div className='button-wrap'>
                        <button className='button-secondary' onClick={copyUrl}>{isLinkCopied ? "Link copied!" : "Copy link"}&nbsp;&nbsp;<img src={isLinkCopied ? checkIcon : linkIcon} className='link-icon'></img></button>
                    </div>
                
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
