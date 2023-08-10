import React, { useContext, useState } from 'react';
import './styles.css';
import Logo from '../../Components/Logo';
import Input from '../../Components/Input';
import { FaGoogle } from 'react-icons/fa';
import app from '../../firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import 'firebase/firestore';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { AuthContext } from '../../Context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('password');
  const [username, setUsername] = useState('priya_099');
  const [googleUsername, setGoogleUsername] = useState('priya_099');
  const [name, setName] = useState('Priya');
  const [open, setOpen] = useState(false);
  const [googleLoginData, setGoogleLoginData] = useState();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore(app);
  const { currentUser } = useContext(AuthContext);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkValueInFirestore = async (username) => {
    try {
      const collectionRef = collection(db, 'Profiles');
      const q = query(collectionRef, where('username', '==', username));
      // Execute the query and get the result
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.log(error);
      return true;
    }
  };

  const handleSave = async () => {
    try {
      if (googleUsername !== '') {
        let usernameTaken = await checkValueInFirestore(googleUsername);
        console.log(usernameTaken);
        if (usernameTaken) {
          alert('Username already taken');
        } else {
          const documentID = googleLoginData.user.uid;
          const dataToAdd = {
            name: googleLoginData.user.displayName,
            username: googleUsername,
            email: googleLoginData.user.email,
            gender: '',
            avatarURL: googleLoginData.user.photoURL,
            bio: '',
            uid: googleLoginData.user.uid
          };
          await addDataWithCustomID(documentID, dataToAdd);
          navigate('/home');
          setOpen(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addDataWithCustomID = async (documentID, dataToAdd) => {
    const docRef = doc(db, 'Profiles', documentID);
    setDoc(docRef, dataToAdd)
      .then(() => {
        console.log(
          'Data added successfully with custom document ID:',
          documentID
        );
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const data = await signInWithPopup(auth, googleProvider);
      setGoogleLoginData(data);
      handleOpen();
      console.log(localStorage.setItem('user', JSON.stringify(data)));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name !== '' && username !== '') {
        let usernameTaken = await checkValueInFirestore(username);
        if (usernameTaken) {
          alert('Username already taken');
        } else {
          const data = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log('user created', data);
          const documentID = data.user.uid;
          const dataToAdd = {
            name: name,
            username: username,
            email: email,
            gender: '',
            avatarURL: '',
            bio: '',
            uid: data.user.uid
          };
          await addDataWithCustomID(documentID, dataToAdd);
          navigate('/home');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser != null) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <div className="signup">
        <div className="box-2">
          <div>
            <Logo />
          </div>
          <p className="signup-txt">
            Sign up to see photos and <br />
            videos from your friends
          </p>
          <button className="signup-btn" onClick={loginWithGoogle}>
            <FaGoogle />
            <span>Log in With Google</span>
          </button>
          <p className="or">OR</p>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Mobile number or email address"
            />
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full name"
            />
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
            <p className="signup-terms">
              People who use our service may have uploaded your contact
              information to Instagram.
              <a href="https://www.facebook.com/help/instagram/261704639352628">
                Learn more
              </a>
            </p>
            <p className="signup-terms">
              By signing up, you agree to our{' '}
              <a href="https://help.instagram.com/581066165581870/?locale=en_GB">
                {' '}
                Terms
              </a>
              ,{' '}
              <a href="https://www.facebook.com/privacy/policy">
                Privacy policy
              </a>{' '}
              and{' '}
              <a href="https://help.instagram.com/1896641480634370/">
                Cookies policy.
              </a>
            </p>
            <div>
              <button className="signup-btn-2">Sign up</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Set Username</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Set a unique username for your account.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setGoogleUsername(e.target.value)}
              value={googleUsername}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Signup;
