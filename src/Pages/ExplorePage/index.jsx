import React, { useEffect, useState } from "react";
import "./styles.css";
import Sidebar from "../../Components/Sidebar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useSnackbar } from "notistack";

const ExplorePage = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");
  const { enqueueSnackbar } = useSnackbar();

  const fetchImages = async (e) => {
    e.preventDefault();
    const API_KEY = "YBIS948QnPNViuGVdQFH1E6gYyHuoL68oE14bI8TnDsleungT22TlIML";
    try {
      const data = await axios.get(
        "https://api.pexels.com/v1/search?query=" + query + "&per_page=100",
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      console.log(data);
      setImages(data.data.photos);
    } catch (error) {
      enqueueSnackbar("Error fetching images", { variant: "error" });
    }
  };

  // useEffect(()=>{
  //   fetchImages()
  // },[])

  return (
    <div className="explore-page">
      <div>
        <Sidebar />
      </div>
      <div className="explore">
        <form onSubmit={fetchImages}>
          <input
            className="explore-input"
            type="text"
            placeholder="Explore images"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="explore-btn" type="submit">
            <FaSearch />
          </button>
        </form>
        <div className="explore-img">
          {images.map((img) => (
            <div key={img.id} className="searched-images">
              <img src={img.src.portrait} alt={img.photographer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
