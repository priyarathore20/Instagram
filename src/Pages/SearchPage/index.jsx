import { Avatar, debounce } from "@mui/material";
import React, { useCallback, useState } from "react";
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
  const [searchLoading, setSearchLoading] = useState(false);
  const db = getFirestore();
  const { enqueueSnackbar } = useSnackbar();

  // const searchUsers = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const q = query(
  //       collection(db, "Profiles"),
  //       where("name", "==", queryText)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     const users = [];
  //     querySnapshot.forEach((doc) => {
  //       users.push(doc.data());
  //     });
  //     setFetchedUsers(users);
  //   } catch (error) {
  //     enqueueSnackbar(error, { variant: "error" });
  //   }
  // };

  const searchUser = async (valueToMatch) => {
    try {
      setSearchLoading(true);
      if (valueToMatch === undefined) {
        // Handle the case where valueToMatch is undefined, e.g., set a default value or return early.
        setSearchLoading(false);
        return;
      }
      const collectionRef = collection(db, "Profiles");
      const fieldToQuery = "name";
      const q = query(collectionRef, where(fieldToQuery, "==", valueToMatch));
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setFetchedUsers(doc.data());
      });
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
      enqueueSnackbar(error, { variant: "error" });
      console.log(error);
    }
  };

  const debounceForSearch = debounce(searchUser, 500);
  const optimizedFn = useCallback(debounceForSearch, []);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setQueryText(value);
    // setFetchedUsers(null);
    optimizedFn(value);
  };

  return (
    <div className="search-box">
      <div className="search-body">
        <Logo />
        <form onSubmit={searchUser}>
          <input
            className="user-search-input"
            type="text"
            placeholder="Search here..."
            value={queryText}
            onChange={handleSearchInputChange}
          />
          <button
            className="explore-btn"
            type="submit"
            disabled={searchLoading}
          >
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
