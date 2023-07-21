import React, { useContext, useState } from 'react';
import './styles.css';
import Logo from '../../Components/Logo';
import Input from '../../Components/Input';
import { ImFacebook2 } from 'react-icons/im';
import { InstagramContext } from '../../Context/Context';

const Signup = () => {
  const {signupWithEmailandPassword} = useContext(InstagramContext)
const [email, setEmail] = useState('abc@gmail.com')
const [password, setPassword] = useState('password')
const [username, setUsername] = useState('priya_099')
const [name, setName] = useState('Priya')
const [error, setError] = useState({email: false, password:false, username: false, name: false})

  const loginWithFacebook = () => {
    window.open(
      'https://www.facebook.com/login.php?skip_api_login=1&api_key=124024574287414&kid_directed_site=0&app_id=124024574287414&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D124024574287414%26locale%3Den_GB%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts%252Fsignup%252F%26response_type%3Dcode%252Cgranted_scopes%26scope%3Demail%26state%3D%257B%2522fbLoginKey%2522%253A%25221rajkqd57jh0z167g8v22r8rbl1vx6goljowvwq1phrnriik6abv%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%2522%257D%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D08b21682-1c25-4eb3-bd71-018916a8aea8%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignup%2F%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3D%257B%2522fbLoginKey%2522%253A%25221rajkqd57jh0z167g8v22r8rbl1vx6goljowvwq1phrnriik6abv%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%2522%257D%23_%3D_&display=page&locale=en_GB&pl_dbl=0'
    );
  };

  const handleSubmit = () => {
    if(email.trim()=== ''){
      setError({email:true})
    }    if(password.trim()=== ''){
      setError({password:true})
    }    if(username.trim()=== ''){
      setError({username:true})
    }    if(name.trim()=== ''){
      setError({name:true})
    }
    signupWithEmailandPassword(email, password);
   console.log("successfull")
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
            <Input error={error} onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Mobile number or email address" />
            <Input error={error} onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Full name" />
            <Input error={error} onChange={e => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
            <Input error={error} onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
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
