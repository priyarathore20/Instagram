import React from 'react';
import './styles.css';
import Avatar from '../Avatar';
import { AiOutlineHeart } from 'react-icons/ai';

const Posts = () => {
  return (
    <div className='posts'>
      <div className="post-card">
        <div className="post-header">
          <div className="profile-pic">
            <Avatar />
          </div>
          <div className="username">john_doe</div>
        </div>
        <div className="post-image">post image</div>
        <div className="post-caption">
          Enjoying a beautiful day at the beach! 🏖️ #beach #vacation
        </div>
        <div className="likes">
          <AiOutlineHeart /> 42 likes
        </div>
        <div className="timestamp">2 hours ago</div>
      </div>
    </div>
  );
};

export default Posts;
