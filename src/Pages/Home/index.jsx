import React from 'react'
import "./Styles.css"
import Sidebar from '../../Components/Sidebar'
import Posts from '../../Components/Post'
import Suggestions from '../../Components/Suggestions'

const Homepage = () => {
  return (
    <>
    <div className='home'>
      <div><Sidebar /></div>
      <div><Posts /></div>
      <div><Suggestions /></div>
    </div>
    </>
  )
}

export default Homepage