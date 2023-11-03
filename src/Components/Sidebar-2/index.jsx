import React, { useContext, useState } from "react";
import "./styles.css";
import Logo from "../Logo";
import {
  AiFillHome,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { TfiVideoClapper } from "react-icons/tfi";
import { RiMessengerLine } from "react-icons/ri";
import { FiPlusSquare } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import app from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";

const Sidebar2 = ({ fetchPosts = () => {} }) => {
  const [image, setImage] = useState(null);
  const auth = getAuth(app);
  const { currentUser } = useContext(AuthContext);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = async () => {
    try {
      await auth.signOut();
      setisDialogOpen(false);
      enqueueSnackbar("Logged out successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target?.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let postURL = "";
      const dbRef = doc(collection(db, "Posts"));
      const postRef = ref(
        storage,
        `posts/${dbRef.id}.${image.name.split(".").pop()}`
      );
      const snapshot = await uploadBytes(postRef, image);
      postURL = snapshot?.metadata?.fullPath;

      const dataToAdd = {
        postImageUrl: postURL,
        caption: caption,
        likes: 0,
        createdAt: new Date(),
        createdBy: {
          uid: currentUser?.uid,
          avatarURL: currentUser?.avatarURL,
          username: currentUser?.username,
        },
      };

      // Add a new document with a generated id
      console.log(dbRef);
      // later...
      await setDoc(dbRef, dataToAdd);
      enqueueSnackbar("Post created successfully", { variant: "success" });
      fetchPosts();
      setOpen(false);
      setCaption("");
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error in creating post", { variant: "error" });
    }

    setLoading(false);
  };

  function handleMenu() {
    setisDialogOpen(true);
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
          alt="#"
        />
      </div>
      <div className="sidebar-options">
        <Link className="sidebar-option" to="/home" key={1}>
          <AiFillHome />
        </Link>
        <Link className="sidebar-option" to="/search" key={2}>
          <AiOutlineSearch />
        </Link>
        <Link className="sidebar-option" to="/explore" key={3}>
          <MdOutlineExplore />
        </Link>
        <Link className="sidebar-option" to="#" key={4}>
          <TfiVideoClapper />
        </Link>
        <Link className="sidebar-option" to="#" key={5}>
          <RiMessengerLine />
        </Link>
        <Link className="sidebar-option" to="#" key={6}>
          <AiOutlineHeart />
        </Link>
        <Link
          className="sidebar-option"
          to="#"
          onClick={handleClickOpen}
          key={7}
        >
          <FiPlusSquare />
        </Link>
        <Link className="sidebar-option" to="/profile" key={8}>
          <RxAvatar />
        </Link>
      </div>

      <div className="dropup-menu">
        <Link className="sidebar-option" to="#" onClick={handleMenu}>
          <AiOutlineMenu />
        </Link>

        <div className="menu-item">
          <Dialog open={isDialogOpen} onClick={onLogout}>
            Log out
          </Dialog>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new post</DialogTitle>
        <DialogContent>
          <TextField
            disabled={loading}
            autoFocus
            margin="dense"
            type="file"
            onChange={handleImageChange}
            fullWidth
          />
          <TextField
            disabled={loading}
            autoFocus
            margin="dense"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            label="Enter caption"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar2;
