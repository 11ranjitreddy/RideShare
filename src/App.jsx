import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import RideBookingPage from './components/RideBookingPage'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
//import Admin from './components/Admin'
const App = () => {
  return (
    <div>
      <Router  basename="/rideshare-frontend">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/book' element={<RideBookingPage/>} />
          <Route path="/services" element={<Services/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact/>}/>
        
        </Routes>
      </Router>
    </div>
  )
}

export default App
