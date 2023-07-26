import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import {
  doc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import 'firebase/firestore';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('password');
  const [username, setUsername] = useState('priya_099');
  const [googleUsername, setGoogleUsername] = useState('priya_099');
  const [name, setName] = useState('Priya');
  const [open, setOpen] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore(app);

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    // addDataWithCustomID()
  }

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const data = await signInWithPopup(auth, googleProvider);
      handleOpen()
      console.log(data);
      const addDataWithCustomID = () => {
        const documentID = data.user.uid;
        const dataToAdd = {
          name: data.user.displayName,
          username: googleUsername,
          email: data.user.email,
          gender: '',
          avatarURL: data.user.photoURL,
          bio: '',
        };
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
      addDataWithCustomID();
      navigate ('/home')
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name !== '' && username !== '') {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('user created', data);
        const addDataWithCustomID = () => {
          const documentID = data.user.uid;
          const dataToAdd = {
            name: name,
            username: username,
            email: email,
            gender: '',
            avatarURL: '',
            bio: '',
          };
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
        addDataWithCustomID();
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            label="Email Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={e=> setGoogleUsername(e.target.value)}
            value={googleUsername}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Save</Button>
        </DialogActions>
      </Dialog>
    </div>

    </>
  );
};

export default Signup;
