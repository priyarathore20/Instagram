import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../Components/Sidebar";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import app from "../../firebaseConfig";
import { AuthContext } from "../../Context/AuthContext";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { useSnackbar } from "notistack";
import Sidebar2 from "../../Components/Sidebar-2";
import { BsThreeDotsVertical } from "react-icons/bs";

const getAvatarUrl = (avatarURL) => {
  if (avatarURL) {
    return `${process.env?.REACT_APP_MEDIA_URL}${avatarURL?.replaceAll(
      "/",
      "%2F"
    )}?alt=media`;
  } else if (avatarURL?.includes("googleusercontent")) {
    return avatarURL;
  } else {
    return "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
  }
};

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const db = getFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const { currentUser } = useContext(AuthContext);
  // console.log('here', currentUser);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/edit-profile");
  };

  const fetchPosts = async () => {
    const postRef = collection(db, "Posts");
    try {
      const q = query(postRef, orderBy("createdAt", "desc"));
      const res = await getDocs(q);
      const data = [];
      res.forEach((doc) => {
        data.push({ id: doc?.id, ...doc.data() });
      });
      console.log(data);
      setImageUrl(data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error, { variant: "error" });
      return [];
    } finally {
    }
  };

  console.log(currentUser);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="profile-section">
      <div className="sidebar--1">
        <Sidebar />
      </div>
      <div className="sidebar--2">
        <Sidebar2 />
      </div>
      <div className="profile">
        <div className="profile-edit">
          <div>
            <img
              src={getAvatarUrl(currentUser?.avatarURL)}
              className="avatar-img-1"
              alt="User Avatar"
            />
          </div>
          <div className="profile-details">
            <div className="profile-username">
              <h4 className="profile-username-name">Priya rathore</h4>
              <button className="profile-username-btn" onClick={handleClick}>
                Edit profile
              </button>
              <BsThreeDotsVertical
                onClick={handleClick}
                className="profile-edit-icon"
              />
            </div>
            <div className="followers">
              <p className="follower">
                500 <span>Followers</span>
              </p>
              <p className="following">
                100 <span>Following</span>
              </p>
            </div>
            <p className="name">{currentUser?.name}</p>
          </div>
        </div>
        <div className="bio">
          <p className="user-bio">{currentUser?.bio}</p>
        </div>
        {imageUrl.map((img) => (
          <>
            <div className="profile-images" key={img.id}>
              <img
                className="profile-img"
                src={`${
                  process.env?.REACT_APP_MEDIA_URL
                }${img.postImageUrl?.replaceAll("/", "%2F")}?alt=media`}
                alt="post"
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
