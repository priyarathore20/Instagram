import React from 'react'
import "./Styles.css"
import Sidebar from '../../Components/Sidebar'

const Homepage = () => {
  return (
    <>
    <div className='home'>
      <div><Sidebar /></div>
      <div>posts</div>
      <div>suggestions</div>
    </div>
    </>
  )
}

export default Homepage