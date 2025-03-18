import './App.css'
import React from 'react'
import PhotoGrid from './components/PhotoGrid';
import Menu from './components/Menu';
import Person from './components/Person'
import Home from './components/Home'
import PeopleDirectory from './components/PeopleDirectory'
import NotFound from './components/NotFound'
import { Route, Routes, Link, NavLink } from 'react-router-dom'


function App() {
  return(
    <>
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
        <Route path="/photos" element={<PhotoGrid />}/>
        <Route path="/people" element={<PeopleDirectory />}/>
        <Route path="/people/:name" element={<Person />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}



export default App;
