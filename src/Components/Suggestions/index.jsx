import React, { useContext } from 'react'
import Link from '../Link'
import "./styles.css"
import { AuthContext } from '../../Context/AuthContext'

const Suggestions = () => {
const {currentUser} = useContext(AuthContext)

  return (
    <div className='suggest'>
      <div className='suggested'>
        <img src={currentUser?.avatarURL} className='avatar-img' />
        <div >
          <p className="username">{currentUser?.username}</p>
          <p className="full-name">{currentUser?.name}</p>
        </div>
      </div>
      <p className='suggesteds'>Suggested for you </p>
      <div className="suggested">
              <img src='https://w0.peakpx.com/wallpaper/856/263/HD-wallpaper-noze-icon-in-2022-really-pretty-girl-cute-girl-pic-ulzzang-girl.jpg' className='avatar-img' />
        <div>
          <p className="username">Virushi20</p>
          <p className="full-name">Virushi jha</p>
        </div>
      </div>
      <div className="suggested">
        <img src="https://i.pinimg.com/236x/ea/dd/31/eadd31709d797e9b09ab2ac82fba5d63.jpg" className='avatar-img'/>
        <div>
          <p className="username">Hameed0921</p>
          <p className="full-name">Hameed Sheikh</p>
        </div>
      </div>
      <div className="suggested">
        <img src="https://qph.cf2.quoracdn.net/main-qimg-11d0c7a027d67e01bfd550dc0f0237da-lq" className='avatar-img'/>
        <div>
          <p className="username">Drishti01</p>
          <p className="full-name">Drishti sharma</p>
        </div>
      </div>
      <div className="suggested">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfb0VpLu-UfjBDZwZgOHuM-Hld04NBGAxsINkHwc&s" className='avatar-img'  />
        <div>
          <p className="username">ayush_agg</p>
          <p className="full-name">Ayush Agarwal</p>
        </div>
      </div>
      <div className="suggested-links">
        <Link href="https://about.meta.com/" name="Meta" />
        <Link href="https://about.instagram.com/" name="About" />
        <Link href="https://about.instagram.com/en_US/blog" name="Blog" />
        <Link href="https://about.instagram.com/about-us/careers" name="Jobs" />
        <Link href="https://help.instagram.com/" name="Help" />
        <Link
          href="https://developers.facebook.com/docs/instagram"
          name="API"
        />
        <Link
          href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect"
          name="Privacy"
        />
        <Link href="https://help.instagram.com/581066165581870/" name="Terms" />
        <Link href="https://about.meta.com/" name="Top accounts" />
        <Link
          href="https://www.instagram.com/explore/locations/"
          name="Location"
        />
        <Link
          href="https://www.instagram.com/web/lite/"
          name="Instagram lite"
        />
        <Link href="https://www.threads.net/" name="Threads" />
        <Link
          href="https://www.facebook.com/help/instagram/261704639352628"
          name="Contact uploading and non-users"
        />
        <Link
          href="https://about.meta.com/technologies/meta-verified/"
          name="Meta verified"
        />
      </div>
      <p className="copyright">&copy; 2023 Instagram from Meta </p>
    </div>
  )
}

export default Suggestions