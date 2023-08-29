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
import { addDoc, collection, getFirestore } from "firebase/firestore";
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

const Sidebar = ({ fetchPosts }) => {
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

  // if (loading)
  //   return (
  //     <div className="loading-state">
  //       <img
  //         src="data:image/jpeg;base64,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"
  //         alt="logo"
  //       />
  //     </div>
  //   );

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let postURL = "";
      const postRef = ref(storage, `posts/${image.name}`);
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

      const dbRef = collection(db, "Posts");
      await addDoc(dbRef, dataToAdd);
      enqueueSnackbar("Post created successfully", { variant: "success" });
      fetchPosts();

      setOpen(false);
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
          src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg"
          alt="#"
        />
      </div>
      <div className="sidebar-options">
        <Link className="sidebar-option" to="/home" key={1}>
          <AiFillHome /> Home
        </Link>
        <Link className="sidebar-option" to="/search" key={2}>
          <AiOutlineSearch /> Search
        </Link>
        <Link className="sidebar-option" to="/explore" key={3}>
          <MdOutlineExplore /> Explore
        </Link>
        <Link className="sidebar-option" to="#" key={4}>
          <TfiVideoClapper /> Reels
        </Link>
        <Link className="sidebar-option" to="#" key={5}>
          <RiMessengerLine /> Messages
        </Link>
        <Link className="sidebar-option" to="#" key={6}>
          <AiOutlineHeart /> Notifications
        </Link>
        <Link
          className="sidebar-option"
          to="#"
          onClick={handleClickOpen}
          key={7}
        >
          <FiPlusSquare /> Create
        </Link>
        <Link className="sidebar-option" to="/profile" key={8}>
          <RxAvatar /> Profile
        </Link>
      </div>

      <div className="dropup-menu">
        <Link className="sidebar-option" to="#" onClick={handleMenu}>
          <AiOutlineMenu /> More
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

export default Sidebar;
