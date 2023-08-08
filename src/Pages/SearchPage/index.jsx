import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getFirestore, collection, where, getDocs } from 'firebase/firestore';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState('');
  const db = getFirestore();

  const searchUsers = async (e) => {
    e.preventDefault();  
    const q = query(collection(db, 'Profiles'), where('name', '==', query));
    const querySnapshot = await getDocs(q);    
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    setFetchedUsers(users);
  };
  return (
    <div>
      <form onSubmit={searchUsers}>
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="explore-btn" type="submit">
          <FaSearch />
        </button>
      </form>
      <>
      <div>
        {fetchedUsers.map((user, index) => (
          <div className="search-card" key={index}>
            <div>
              <Avatar>{user.name.charAt(0)}</Avatar>
            </div>
            <div>
              <p>{user.username}</p>
              <p>{user.name}</p>
            </div>
          </div>
        ))}
      </div>
        </>
      </div>
  );
};

export default SearchPage;
