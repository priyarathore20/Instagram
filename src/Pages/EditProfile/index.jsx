import React, { useContext, useState } from 'react';
import './styles.css';
import Input from '../../Components/Input';
import Logo from '../../Components/Logo';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import app from '../../firebaseConfig';
import AppContext from '../../Context/AppContext';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const EditPage = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const db = getFirestore(app);
  const storage = getStorage(app);
  const { currentUser, googleCurrentUser } = useContext(AppContext);

  const updateUserInfo = async (userId, dataToUpdate) => {
    try {
      const userRef = doc(db, 'Profiles', userId);
      await setDoc(userRef, dataToUpdate, { merge: true });
      console.log('User info updated successfully');
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatarURL = ''; // Initialize avatarURL
    try {
      if (image) {
        // Upload the image to Firebase Storage
        const imageRef = ref(storage, `profileImages/${image.name}`);
        await uploadBytes(imageRef, image);

        // Get the download URL of the uploaded image
        avatarURL = await getDownloadURL(imageRef);
      }

      if (currentUser) {
        const { uid, email, displayName, photoURL } = currentUser.data;
        const dataToUpdate = {
          name: displayName,
          username: username,
          email: email,
          avatarURL: avatarURL || photoURL || '',
          bio: bio,
          gender: gender,
        };
        updateUserInfo(uid, dataToUpdate);
      } else {
        const { uid, email, displayName, photoURL } = googleCurrentUser;
        const dataToUpdate = {
          name: displayName,
          username: username,
          email: email,
          avatarURL: avatarURL || photoURL || '',
          bio: bio,
          gender: gender,
        };
        updateUserInfo(uid, dataToUpdate);
      }
    } catch (error) {
      console.log(error);
    }
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