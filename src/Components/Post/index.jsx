import React, { useContext, useState } from 'react';
import './styles.css';
import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import app from '../../firebaseConfig';
import { getStorage } from 'firebase/storage';
import { PiShareFat } from 'react-icons/pi';
import { FcLike } from 'react-icons/fc';
import { AuthContext } from '../../Context/AuthContext';
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { getRelativeTime } from '../../helper';

const PostCard = ({
  id,
  username,
  avatarURL,
  postImageUrl,
  caption,
  likes,
  createdAt,
  likeUsers = [],
}) => {
  const { currentUser } = useContext(AuthContext);
  const db = getFirestore(app);

  const storage = getStorage(app);

  const [imageUrl, setImageUrl] = useState('');
  const [likeUsersArray, setLikeUsersArray] = useState(likeUsers);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLikePost = async () => {
    let set = new Set([...likeUsers, currentUser?.uid]);
    const updatedData = Array.from(set);
    const dataToUpdate = { likeUsers: updatedData, likes: updatedData?.length };
    try {
      const postsCollection = collection(db, 'Posts');
      const userRef = doc(postsCollection, id);
      const data = await updateDoc(userRef, dataToUpdate);
      console.log(id, data);
      setLikeUsersArray(updatedData);
      setLikesCount(updatedData?.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislikeLikePost = async () => {
    const updatedData = likeUsers?.filter((item) => item !== currentUser?.uid);
    const dataToUpdate = {
      likeUsers: updatedData,
    };
    try {
      const postsCollection = collection(db, 'Posts');
      const userRef = doc(postsCollection, id);
      await updateDoc(userRef, dataToUpdate);
      console.log(id, dataToUpdate);
      setLikeUsersArray(updatedData);
      setLikesCount(updatedData?.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="profile-pic">
          <img src={avatarURL} alt="#" />
        </div>
        <div className="username">
          {username}
          <span className="timestamp">
            {' '}
            • {getRelativeTime(createdAt?.seconds)}
          </span>
        </div>
      </div>
      <img
        className="post-image"
        src={`${process.env?.REACT_APP_MEDIA_URL}${postImageUrl?.replaceAll(
          '/',
          '%2F'
        )}?alt=media`}
        alt="post"
      />
      <div className="post-actions">
        {likeUsersArray?.includes(currentUser?.uid) ? (
          <FcLike onClick={handleDislikeLikePost} />
        ) : (
          <AiOutlineHeart onClick={handleLikePost} />
        )}
        <AiOutlineComment />
        <PiShareFat />
      </div>
      <p>{likesCount} likes</p>
      <div className="post-caption">
        <p className="username-2">{username}</p> <p> {caption}</p>
      </div>
    </div>
  );
};

export default PostCard;
