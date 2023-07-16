import React from 'react'
import Logo from '../../Components/Logo'
import Input from '../../Components/Input'

const LoginPage = () => {
  return (
    <div>
      <img src="https://media.gcflearnfree.org/content/633d944b3823fb02e84dce55_10_05_2022/Screen%20Shot%202022-10-10%20at%202.28.19%20PM.png" alt="#" />
     <div>
      <div className="login-box">
        <Logo />
        <form className="input">
          <Input type='text' placeholder='Phone number, username or email address' />
          <Input type='password' placeholder='Password' />
          <button className='login-btn'>Log in</button>
        </form>
        <p>OR</p>
        <div>
        <p>Log in with Facebook</p>
        </div>
        <a href="#">Forgotten your password?</a>
      </div>
      <div className="new-account">
        <p>Dont't have an account? <a href="#">Sign up</a></p>
      </div>
      <div className="get-app">
        <p>Get the app.</p>
        <div>
        <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo"><img src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg" alt="#" /></a>
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3DC71EBC7C-3B36-4970-9D33-271DE513101A%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge"><img src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg" alt="#" /></a>
      </div>
      </div>
      </div>
    </div>
  )
}

export default LoginPage