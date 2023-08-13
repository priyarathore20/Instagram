import React, { useContext, useState } from 'react';
import './styles.css';
import Input from '../../Components/Input';
import Logo from '../../Components/Logo';
import {
  collection,
  doc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import app from '../../firebaseConfig';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { useSnackbar } from 'notistack';
import { getAuth } from 'firebase/auth';

const EditPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState(currentUser?.username);
  const [fullName, setFullName] = useState(currentUser?.name);
  const [bio, setBio] = useState(currentUser?.bio);
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState(currentUser?.email);
  const [gender, setGender] = useState(currentUser?.gender);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const storage = getStorage(app);
  const { enqueueSnackbar } = useSnackbar();

  const updateUserInfo = async (uid, dataToUpdate) => {
    try {
      const profilesCollection = collection(db, 'Profiles');
      const userRef = doc(profilesCollection, uid);
      await updateDoc(userRef, dataToUpdate);
      console.log(uid, dataToUpdate);
      console.log('Updated');
      enqueueSnackbar('Data updated successfully', {variant:'success'});
      navigate('/profile');
    } catch (error) {
      enqueueSnackbar(error, {variant:'error'});
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target?.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatarURL = '';
    const avatarRef = ref(
      storage,
      `avatar/${currentUser}.${image.name.split('.').pop()}`
    );
    const snapshot = await uploadBytes(avatarRef, image);
    avatarURL = snapshot?.metadata?.fullPath;

    const userRef = auth?.currentUser?.uid;
    const dataToUpdate = {
      name: fullName,
      username: username,
      email: email,
      bio: bio,
      gender: gender,
      avatarURL: avatarURL,
    };
    if (username && email === '') {
   enqueueSnackbar('Please enter some value', {variant:'error'});
    }
    updateUserInfo(userRef, dataToUpdate);
  };

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
              placeholder="New username"
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
