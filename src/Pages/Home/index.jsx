import React, { useContext, useEffect, useState } from 'react';
import './Styles.css';
import Sidebar from '../../Components/Sidebar';
import Posts from '../../Components/Post';
import Suggestions from '../../Components/Suggestions';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import app from '../../firebaseConfig';
import { useSnackbar } from 'notistack';
import PostCard from '../../Components/Post';
import { AuthContext } from '../../Context/AuthContext';

const Homepage = () => {
  const { currentUser } = useContext(AuthContext);

  const db = getFirestore(app);
  const storage = getStorage(app);
  const [postsData, setPostsData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchPosts = async () => {
      const postRef = collection(db, 'Posts');
      try {
        const query = await getDocs(postRef);
        const data = [];
        query.forEach((doc) => {
          data.push(doc.data());
        });
        console.log(data);
        setPostsData(data);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error, { variant: 'error' });
        return [];
      } finally {
      }
    };
    fetchPosts();
  }, [db, storage]);

  return (
    <>
      <div className="home">
        <div>
          <Sidebar />
        </div>
        <div>
          {postsData?.map((item, index) => (
            <PostCard
              key={index}
              username={currentUser?.username}
              avatarURL={currentUser?.avatarURL}
              postImageUrl={item?.postImageUrl}
              caption={item?.caption}
              likes={item?.likes}
              createdAt={item?.createdAt}
            />
          ))}
        </div>
        <div>
          <Suggestions />
        </div>
      </div>
    </>
  );
};

export default Homepage;
