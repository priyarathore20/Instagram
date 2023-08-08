import React, { useState } from 'react';
import './styles.css';
import Logo from '../Logo';
import {
  AiFillHome,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch,
} from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { TfiVideoClapper } from 'react-icons/tfi';
import { RiMessengerLine } from 'react-icons/ri';
import { FiPlusSquare } from 'react-icons/fi';
import {FaRegImages} from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx';
import app from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const auth = getAuth(app);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const dialogOpen = () => {
    setIsDialogOpen(true)
  }

  const onLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <div>
        <Logo />
      </div>
      <div className="sidebar-options">
        <a className="sidebar-option" href="/home">
          <AiFillHome /> Home
        </a>
        <a className="sidebar-option" href="/search">
          <AiOutlineSearch /> Search
        </a>
        <a className="sidebar-option" href="/explore">
          <MdOutlineExplore /> Explore
        </a>
        <a className="sidebar-option" href="#">
          <TfiVideoClapper /> Reels
        </a>
        <a className="sidebar-option" href="#">
          <RiMessengerLine /> Messages
        </a>
        <a className="sidebar-option" href="#">
          <AiOutlineHeart /> Notifications
        </a>
        <a className="sidebar-option" href="#">
          <FiPlusSquare /> Create
        </a>
        <Link className="sidebar-option" to="/profile">
          <RxAvatar /> Profile
        </Link>
      </div>
      <div className='dropup-menu'>
        <a className="sidebar-option" href="#" onClick={handleOpen}>
          <AiOutlineMenu /> More
        </a>
        {isOpen && (
          <div className="menu-item">
            <a href="#" onClick={onLogout}>
              Log out
            </a>
          </div>
        )}
      </div>
      {isDialogOpen && 
<div className="dialog" onClick={dialogOpen}>
  <div className="bar">Create new post</div>
  <div>
  <div className="content"><FaRegImages /> Drag photos and videos here.</div>
  <button className="content-btn">Select from computer</button>
  </div>
</div>}
    </div>
  );
};

export default Sidebar;
