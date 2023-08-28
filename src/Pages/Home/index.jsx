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
import { Link } from 'react-router-dom';
import { AiFillHome, AiOutlineHeart, AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { TfiVideoClapper } from 'react-icons/tfi';
import { RiMessengerLine } from 'react-icons/ri';
import { FiPlusSquare } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';

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
<div className="sidebar-2">
<div className="sidebar-logo">
        <img
          className="logo"
          src="https://logos-download.com/wp-content/uploads/2016/03/Instagram_Logo_2016.svg"
          alt="#"
        />
      </div>
      <div className="sidebar-options">
  <Link className='sidebar-option sidebar-option-1' to={'/home'}><AiFillHome /></Link>
  <Link className='sidebar-option sidebar-option-1' to={'/search'}><AiOutlineSearch /></Link>
  <Link className='sidebar-option sidebar-option-1' to={'/explore'}><MdOutlineExplore /></Link>
  <Link className='sidebar-option sidebar-option-1' to={'/reels'}><TfiVideoClapper /></Link>
  <Link className='sidebar-option sidebar-option-1' to={'/message'}><RiMessengerLine /></Link>
  <Link className='sidebar-option sidebar-option-1' to={'/notifications'}><AiOutlineHeart /></Link>
  <Link className='sidebar-option sidebar-option-1' to={'/create'}><FiPlusSquare /></Link>
  <Link className='sidebar-option sidebar-option-1' to={'/profile'}><RxAvatar /></Link>
  </div>
</div>
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
