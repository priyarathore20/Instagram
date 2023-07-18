import React from 'react';
import "./styles.css"
import Logo from '../../Components/Logo';
import Input from '../../Components/Input';

const Signup = () => {
  return (
    <>
      <div className="box-2">
        <div>
          <Logo />
        </div>
        <p className="signup-txt">
          Sign up to see photos and <br />
          videos from your friends
        </p>
        <button className="signup-btn">Log in With Facebook</button>
        <p>OR</p>
        <form className='form'>
          <Input type="text" placeholder="Mobile number or email address" />
          <Input type="text" placeholder="Full name" />
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
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
          <button className='signup-btn'>Sign up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
