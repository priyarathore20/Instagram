import React, { useContext, useState } from 'react';
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
import { FaRegImages } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import app from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import Input from '../Input';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const auth = getAuth(app);
  const { currentUser } = useContext(AuthContext);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    handleSubmit(e); 
    setOpen(false);
  };
  
  const onLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target?.files[0]);
  };

  const addDataWithCustomID = async (documentID, dataToAdd) => {
    try {
      const docRef = doc(db, 'Posts', documentID);
      await setDoc(docRef, dataToAdd);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let postURL = '';
    const avatarRef = ref(
      storage,
      `avatar/${currentUser}.${image.name.split('.').pop()}`
    );
    const snapshot = await uploadBytes(avatarRef, image);
    postURL = snapshot?.metadata?.fullPath;

    const documentID = currentUser?.uid;
    const dataToAdd = {
      post: postURL,
      caption: caption
    };
    await addDataWithCustomID(documentID, dataToAdd);
  };

  return (
    <div className="sidebar">
      <div>
        <Logo />
      </div>
      <div className="sidebar-options">
        <Link className="sidebar-option" to="/home">
          <AiFillHome /> Home
        </Link>
        <Link className="sidebar-option" to="/search">
          <AiOutlineSearch /> Search
        </Link>
        <Link className="sidebar-option" to="/explore">
          <MdOutlineExplore /> Explore
        </Link>
        <Link className="sidebar-option" to="#">
          <TfiVideoClapper /> Reels
        </Link>
        <Link className="sidebar-option" to="#">
          <RiMessengerLine /> Messages
        </Link>
        <Link className="sidebar-option" to="#">
          <AiOutlineHeart /> Notifications
        </Link>
        <Link className="sidebar-option" to="#" onClick={handleClickOpen}>
          <FiPlusSquare /> Create
        </Link>
        <Link className="sidebar-option" to="/profile">
          <RxAvatar /> Profile
        </Link>
      </div>
      <div className="dropup-menu">
        <Link className="sidebar-option" to="#" >
          <AiOutlineMenu /> More
        </Link>
        {isOpen && (
          <div className="menu-item">
            <Link to="#" onClick={onLogout}>
              Log out
            </Link>
          </div>
        )}
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create new post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              label="Enter caption"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;
