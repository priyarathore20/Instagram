import React from 'react';
import "./styles.css"
import Logo from '../../Components/Logo';
import Input from '../../Components/Input';
import Link from '../../Components/Link';

const LoginPage = () => {
  return (
    <><div className='Login'>
      <img className='login-img'
        src="https://media.gcflearnfree.org/content/633d944b3823fb02e84dce55_10_05_2022/Screen%20Shot%202022-10-10%20at%202.28.19%20PM.png"
        alt="#" />
      <div className='box'>
        <div className="login-box">
         <Logo />
          <form className="input">
            <Input
              type="text"
              placeholder="Phone number, username or email address" />
            <Input type="password" placeholder="Password" />
            <button className="login-btn">Log in</button>
          </form>
          <p>OR</p>
          <div className='other-method'>
            <p>Log in with Facebook</p>
          </div>
          <a href="#" className='to-signup'>Forgotten your password?</a>
        </div>
        <div className="new-account">
          <p>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
        <div className="get-app">
          <p>Get the app.</p>
          <div className='download-app'>
            <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo">
              <img className='download-img'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png"
                alt="#" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3DC71EBC7C-3B36-4970-9D33-271DE513101A%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge">
              <img className='download-img'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt="#" />
            </a>
          </div>
        </div>
      </div>
    </div><div className='login-links'>
        <Link href="https://about.meta.com/" name="Meta" />
        <Link href="https://about.instagram.com/" name="About" />
        <Link href="https://about.instagram.com/en_US/blog" name="Blog" />
        <Link href="https://about.instagram.com/about-us/careers" name="Jobs" />
        <Link href="https://help.instagram.com/" name="Help" />
        <Link href="https://developers.facebook.com/docs/instagram" name="API" />
        <Link href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect" name="Privacy" />
        <Link href="https://help.instagram.com/581066165581870/" name="Terms" />
        <Link href="https://about.meta.com/" name="Top accounts" />
        <Link href="https://www.instagram.com/explore/locations/" name="Location" />
        <Link href="https://www.instagram.com/web/lite/" name="Instagram lite" />
        <Link href="https://www.threads.net/" name="Threads" />
        <Link href="https://www.facebook.com/help/instagram/261704639352628" name="Contact uploading and non-users" />
        <Link href="https://about.meta.com/technologies/meta-verified/" name="Meta verified" />
      </div>
      <p className='copyright'>&copy; 2023 Instagram from Meta </p></>
  );
};

export default LoginPage;
