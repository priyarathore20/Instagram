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
        <a href="#"><AiFillHome /> Home</a>
        <a href="#"><AiOutlineSearch /> Search</a>
        <a href="#"><MdOutlineExplore /> Explore</a>
        <a href="#"><TfiVideoClapper /> Reels</a>
        <a href="#"><RiMessengerLine /> Messages</a>
        <a href="#"><AiOutlineHeart /> Notifications</a>
        <a href="#"><FiPlusSquare /> Create</a>
        <a href="#"><RxAvatar /> Create</a>
      </div>
      <div>
        <a href="#"><AiOutlineMenu /> More</a>
      </div>
    </div>
  )
}

export default Sidebar