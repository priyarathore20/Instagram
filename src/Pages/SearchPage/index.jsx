import { Avatar } from '@mui/material';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getFirestore, collection } from 'firebase/firestore';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState('');
  const db = getFirestore();

  const initial = fetchedUsers.charAt[0];
  const result = db
    .collection('Profiles')
    .where('name', '==', query)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  setFetchedUsers(result);

  return (
    <div>
      <form>
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
      <div>
        <div className="search-card">
          <div>
            <Avatar>{initial}</Avatar>
          </div>
          <div>
            <p>{fetchedUsers.username}</p>
            <p>{fetchedUsers.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
