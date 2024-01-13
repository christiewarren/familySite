import './App.css'
import React from 'react'
import PhotoGrid from './components/PhotoGrid';
import Menu from './components/Menu';
import Person from './components/Person'
import Home from './components/Home'
import People from './components/People'
import NotFound from './components/NotFound'
import { Route, Routes, Link, NavLink } from 'react-router-dom'


function App() {
  return(
    <>
    <nav>
      <NavLink className={({isActive}) => isActive ? 'active-nav-link' : 'nav-link'} to='/'>Home</NavLink>
      <NavLink className={({isActive}) => isActive ? 'active-nav-link' : 'nav-link'} to='/photos'>Photos</NavLink>
      <NavLink className={({isActive}) => isActive ? 'active-nav-link' : 'nav-link'} to='/people'>People</NavLink>
    </nav>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/photos" element={<PhotoGrid />}/>
        <Route path="/people" element={<People />}/>
        <Route path="/people/:name" element={<Person />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  )
}



export default App;
