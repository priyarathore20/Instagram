import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import Avatar from '../Avatar';
import { AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from '../../Context/AuthContext';
import app from '../../firebaseConfig';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useSnackbar } from 'notistack';

const PostCard = ({
  username,
  avatarURL,
  postImageUrl,
  caption,
  likes,
  crratedAt,
}) => {
  // const { currentUser } = useContext(AuthContext);
  // const db = getFirestore(app);

  const storage = getStorage(app);

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    getDownloadURL(ref(storage, postImageUrl))
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }, []);

  return (
    <div className="posts">
      <div className="post-card">
        <div className="post-header">
          <div className="profile-pic">
            <img src={avatarURL} alt="#" />
          </div>
          <div className="username">{}</div>
        </div>
        <img className="post-image" src={imageUrl} alt="post" />
        <div className="post-caption">
          <p className="username-2">{username}</p> <p> {caption}</p>
        </div>
        <div className="likes">
          <AiOutlineHeart /> {likes}
        </div>
        <div className="timestamp">2 hours ago</div>
      </div>
    </div>
  );
};

export default PostCard;
