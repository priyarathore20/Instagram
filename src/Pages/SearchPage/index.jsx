import React, { useState } from 'react';
import './styles.css';
import Sidebar from '../../Components/Sidebar';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const SearchPage = () => {
  const [images, setImages] = useState();
  const [query, setQuery] = useState();

  const fetchImages = async (e) => {
    e.preventDefault();
    const API_KEY = 'YBIS948QnPNViuGVdQFH1E6gYyHuoL68oE14bI8TnDsleungT22TlIML';
    try {
      const data = await axios.get(
        'https://api.pexels.com/v1/search?query=' + query + '&per_page=100',
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      console.log(data);
      setImages(data.data.photos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="explore">
        <form onSubmit={fetchImages}>
          <input
            type="search"
            placeholder="Explore images"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit">
            <FaSearch />
          </button>{' '}
        </form>
        <div className="explore-img">
          {images.map((img) => {
              <div key={img.id}>
              <img src={img.src.medium} alt={img.photographer} />
            </div>
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
