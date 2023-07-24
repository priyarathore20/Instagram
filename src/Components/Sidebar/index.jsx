import React from 'react'
import "./styles.css"
import Logo from '../Logo'
import {AiFillHome, AiOutlineHeart, AiOutlineMenu, AiOutlineSearch} from "react-icons/ai"
import {MdOutlineExplore} from "react-icons/md"
import {TfiVideoClapper} from "react-icons/tfi"
import {RiMessengerLine} from "react-icons/ri"
import {FiPlusSquare} from "react-icons/fi"
import {RxAvatar} from "react-icons/rx"

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div><Logo/></div>
      <div className='sidebar-options'>
        <a className='sidebar-option' href="/home"><AiFillHome /> Home</a>
        <a className='sidebar-option' href="#"><AiOutlineSearch /> Search</a>
        <a className='sidebar-option' href="#"><MdOutlineExplore /> Explore</a>
        <a className='sidebar-option' href="#"><TfiVideoClapper /> Reels</a>
        <a className='sidebar-option' href="#"><RiMessengerLine /> Messages</a>
        <a className='sidebar-option' href="#"><AiOutlineHeart /> Notifications</a>
        <a className='sidebar-option' href="#"><FiPlusSquare /> Create</a>
        <a className='sidebar-option' href="#"><RxAvatar /> Profile</a>
      </div>
      <div>
        <a className='sidebar-option' href="#"><AiOutlineMenu /> More</a>
      </div>
    </div>
  )
}

export default Sidebar