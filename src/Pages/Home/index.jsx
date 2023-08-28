import React, { useEffect, useState } from 'react';
import './Styles.css';
import Sidebar from '../../Components/Sidebar';
import Suggestions from '../../Components/Suggestions';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import app from '../../firebaseConfig';
import { useSnackbar } from 'notistack';
import PostCard from '../../Components/Post';

const Homepage = () => {

  const db = getFirestore(app);
  const storage = getStorage(app);
  const [postsData, setPostsData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchPosts = async () => {
    const postRef = collection(db, 'Posts');
    try {
      const q = query(postRef, orderBy('createdAt', 'desc'));
      const res = await getDocs(q);
      const data = [];
      res.forEach((doc) => {
        data.push({ id: doc?.id, ...doc.data() });
      });
      setPostsData(data);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error, { variant: 'error' });
      return [];
    } finally {
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [db, storage]);

  return (
    <>
      <div className="home">
        <Sidebar fetchPosts={fetchPosts} />

        <div className="home-posts">
          <div className="posts">
            {postsData?.map((item) => (
              <PostCard
                id={item?.id}
                key={item?.id}
                username={item?.createdBy?.username}
                avatarURL={item?.createdBy?.avatarURL}
                postImageUrl={item?.postImageUrl}
                caption={item?.caption}
                likes={item?.likes}
                createdAt={item?.createdAt}
                likeUsers={item?.likeUsers}
              />
            ))}
          </div>
        </div>

        <Suggestions />
      </div>
    </>
  );
};

export default Homepage;
