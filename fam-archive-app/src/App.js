import './App.css'
import React from 'react'
import { useEffect } from "react";
import PhotosPage from './components/PhotosPage';
import Menu from './components/Menu';
import Person from './components/Person'
import Home from './components/Home'
import PeopleDirectory from './components/PeopleDirectory'
import NotFound from './components/NotFound'
import { Route, Routes, Link, NavLink, useSearchParams } from 'react-router-dom'
import images from './data/imageData.json'


function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isPageScrollable, setIsPageScrollable] = React.useState(!searchParams.get('modal'))

  useEffect(() => {
    setIsPageScrollable(!searchParams.get('modal'))
  }, [searchParams.get('modal')])

  useEffect(() => {
    // Add a class to the body when this isPageScrollable changes and when initially rendered
    console.log('isScrollable changed')
    if(!isPageScrollable){
      document.body.classList.add('not-scrollable');
    }else{
      document.body.classList.remove('not-scrollable')
    }
  }, [isPageScrollable]);

  
  const s3ImageUrls = []

  useEffect(() => {
    // Function to preload images without storing in state
    images.forEach((image) => {
      s3ImageUrls.push('https://lanefamilysite.s3.us-east-2.amazonaws.com/' + image.filename + '.jpg')
    })
    const preloadImages = async () => {
      s3ImageUrls.forEach(url => {
        const img = new Image()
        img.src = url // Set the image source, causing it to be loaded and cached
        // img.onload = () => console.log(`Image loaded: ${url}`);  // Log when image is loaded
        img.onerror = (err) => console.error(`Error loading image: ${url}`, err); // Handle load errors
      });
    };

    preloadImages();
  }, [])

  return(
    <div>
    <nav>
      <Link to='/' className='nav-title'><h3><span className='hand'>Lane</span> Family Archive</h3></Link>
      <span className='nav-links-wrap'>
        <NavLink className='nav-link' to='/'>Home</NavLink>
        <NavLink className='nav-link' to='/photos'>Photos</NavLink>
        <NavLink className='nav-link' to='/people'>People</NavLink>
      </span>
    </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/photos" element={
          <PhotosPage 
          filterDetails={{
              isFiltered: false,
              filterType: "date",
              sections: ["2000-2050", "1950-2000", "1900-1950", "1850-1900"]
            }}/>}/>
        <Route path="/people" element={<PeopleDirectory />}/>
        <Route path="/people/:name" element={<Person className="person-wrap"/>}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  )
}



export default App;
