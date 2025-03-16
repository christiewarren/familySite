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
      <NavLink className='nav-link' to='/'>Home</NavLink>
      <NavLink className='nav-link' to='/photos'>Photos</NavLink>
      <NavLink className='nav-link' to='/people'>People</NavLink>
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
