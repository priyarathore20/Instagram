import React, {useState } from 'react';
import './styles.css';
import Logo from '../../Components/Logo';
import Input from '../../Components/Input';
import { ImFacebook2 } from 'react-icons/im';
import app from '../../firebaseConfig'
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
const [email, setEmail] = useState("abc@gmail.com")
const [password, setPassword] = useState("password")
const [username, setUsername] = useState("priya_099")
const [name, setName] = useState("Priya")
const auth = getAuth(app)
const navigate = useNavigate()
const facebook = new FacebookAuthProvider()

  const loginWithFacebook = () => {
    signInWithPopup(auth, facebook)
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(name !== '' && username !== '')
    createUserWithEmailAndPassword(auth, email, password)
    console.log("user created")
    await navigate('/home') 
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
          <button className="signup-btn" onClick={loginWithFacebook}>
            <ImFacebook2 />
            <span>Log in With Facebook</span>
          </button>
          <p className="or">OR</p>
          <form className="form" onSubmit={handleSubmit}>
            <Input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Mobile number or email address" />
            <Input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Full name" />
            <Input onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
            <Input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
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
            <div className="signup-btn-2">
              <button className="signup-btn ">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
