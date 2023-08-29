import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import "./styles.css";
import Logo from "../../Components/Logo";
import { useSnackbar } from "notistack";

const SearchPage = () => {
  const [queryText, setQueryText] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const db = getFirestore();
  const { enqueueSnackbar } = useSnackbar();

  const searchUsers = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "Profiles"),
        where("name", "==", queryText)
      );
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setFetchedUsers(users);
    } catch (error) {
      enqueueSnackbar(error, { variant: "error" });
    }
  };
  return (
    <div className="search-box">
      <div className="search-body">
        <Logo />
        <form onSubmit={searchUsers}>
          <input
            className="user-search-input"
            type="text"
            placeholder="Search here..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
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
    </div>
  );
};

export default SearchPage;
