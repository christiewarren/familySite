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
