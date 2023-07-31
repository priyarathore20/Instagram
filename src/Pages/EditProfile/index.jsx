import React, { useContext, useState } from 'react';
import './styles.css';
import Input from '../../Components/Input';
import Logo from '../../Components/Logo';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import app from '../../firebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const EditPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserId(uid);
    }
  });

  const updateUserInfo = async (uid, dataToUpdate) => {
    try {
      const userRef = doc(db, 'Profiles', uid);
      await setDoc(userRef, dataToUpdate);
      console.log('Updated');
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userIdToUpdate = userId;
    const dataToUpdate = {
      name: fullName,
      username: username,
      email: email,
      bio: bio,
      gender: gender,
      avatarURL: '',
    };
  updateUserInfo(userIdToUpdate, dataToUpdate);
  };


  //       }

  return (
    <div className="edit">
      <div className="app">
        <form className="edit-form" onSubmit={handleSubmit}>
          <div>
            <Logo />
          </div>
          <h2>Edit your profile :</h2>
          <div>
            <Input
              placeholder="Set username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <br />
            <Input
              placeholder="Enter full name"
              type="text"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <br />
            <Input
              placeholder="Enter your bio..."
              type="text"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
            <br />
            <Input
              placeholder="Gender"
              type="text"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            />
            <br />
            <Input
              placeholder="Update email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <input
              className="upload-img"
              type="file"
              placeholder="Upload image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <br />
            <button type="submit" className="edit-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
