import React from 'react'
import "./Styles.css"
import Sidebar from '../../Components/Sidebar'
import Posts from '../../Components/Post'

const Homepage = () => {
  return (
    <>
    <div className='home'>
      <div><Sidebar /></div>
      <div><Posts /></div>
      <div>suggestions</div>
    </div>
    </>
  )
}

export default Homepage