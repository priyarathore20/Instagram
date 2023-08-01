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
import { RxAvatar } from 'react-icons/rx';
import app from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = getAuth(app);

  const handleMenu = () => {
    setIsOpen(true);
  };

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
        <a className="sidebar-option" href="/explore">
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
        <a className="sidebar-option" href="/profile">
          <RxAvatar /> Profile
        </a>
      </div>
      <div>
        <a className="sidebar-option" href="#" onClick={handleMenu}>
          <AiOutlineMenu /> More
        </a>
        {isOpen && (
          <div className="menu-items">
            <a href="#" onClick={onLogout}>
              Log out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
