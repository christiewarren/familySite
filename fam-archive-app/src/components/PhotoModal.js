import React from 'react'

export default function PhotoModal(){

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


    return(
        <div className='photo-modal-wrap' id='photo-modal'>
            <div id='photo-modal-overlay' className='photo-modal-overlay'></div>
            <div className='photo-modal'>
                <div className='photo-modal-img-wrap'>
                    <img src='' className='photo-modal-img' id='photo-modal-img'/>
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
                <button onClick={togglePhotoModalDetails} className='photo-modal-expand-collapse-btn'>{detailsPanelBtnText} details</button>
            </div>
        </div>
    )
}
