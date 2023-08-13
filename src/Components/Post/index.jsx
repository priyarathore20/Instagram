import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import Avatar from '../Avatar';
import { AiOutlineHeart } from 'react-icons/ai';
import { AuthContext } from '../../Context/AuthContext';
import app from '../../firebaseConfig';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

const Posts = () => {
  const { currentUser } = useContext(AuthContext);
  const db = getFirestore(app);
  const storage = getStorage(app)
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postRef = collection(db, 'posts');
      try {
        const query = await getDocs(postRef);
        const data = [];
        query.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setImageData(data);
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    fetchPosts();
  }, [db, storage]);

  return (
    <div className="posts">
      {imageData.map((image) => {
        <>
          <div key={image.id} className="post-card">
            <div className="post-header">
              <div className="profile-pic">
                <img src={currentUser?.avatarURL} alt="#" />
              </div>
              <div className="username">{currentUser?.username}</div>
            </div>
            <div className="post-image">{image?.post}</div>
            <div className="post-caption">{image?.caption}</div>
            <div className="likes">
              <AiOutlineHeart /> {image?.likes}
            </div>
            <div className="timestamp">2 hours ago</div>
          </div>
        </>;
      })}
    </div>
  );
};

export default Posts;
