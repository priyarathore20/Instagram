import React from 'react'
import Avatar from '../Avatar'
import Link from '../Link'
import "./styles.css"

const Suggestions = () => {
  return (
    <div className='Suggestions'>
      <div className='suggested'>
        <img src='https://funylife.in/wp-content/uploads/2023/04/58_Cute-Girl-Pic-WWW.FUNYLIFE.IN_-1-1024x1024.jpg' className='avatar-img' />
        <div >
          <p className="username">John_Doe</p>
          <p className="full-name">John Doe</p>
        </div>
      </div>
      <p className='suggesteds'>Suggested for you </p>
      <div className="suggested">
        <Avatar />
        <div>
          <p className="username">Virushi20</p>
          <p className="full-name">Virushi jha</p>
        </div>
      </div>
      <div className="suggested">
        <Avatar />
        <div>
          <p className="username">Hameed0921</p>
          <p className="full-name">Hameed Sheikh</p>
        </div>
      </div>
      <div className="suggested">
        <Avatar />
        <div>
          <p className="username">Drishti01</p>
          <p className="full-name">Drishti sharma</p>
        </div>
      </div>
      <div className="suggested">
        <Avatar />
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