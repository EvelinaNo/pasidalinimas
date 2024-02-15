import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import  Home  from './components/Home'
import  Navbar from './components/Navbar'
import { Registration } from './components/Registration'
import { Donor } from './components/Donor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/donor/:id' element={<Donor />}/>
      </Routes>
    </>
  )
}

export default App
