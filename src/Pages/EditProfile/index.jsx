import React, { useState } from 'react';
import './styles.css';
import Input from '../../Components/Input';
import Logo from '../../Components/Logo';

const EditPage = () => {
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
const [bio, setBio] = useState('')
const [email, setEmail] = useState('')
const [gender, setGender ] = useState('')

  return (
    <div className="edit">
      <div className="app">
        <form className="edit-form">
          <div>
            <Logo />
          </div>
          <h2>Edit your profile :</h2>
          <div>
            <Input placeholder="Set username" type="text" onChange={e => setUsername(e.target.value)} value={username}/>
            <br />
            <Input placeholder="Enter full name" type="text" onChange={e => setFullName(e.target.value)} value={fullName} />
            <br />
            <Input placeholder="Enter your bio..." type="text" onChange={e => setBio(e.target.value)} value={bio}/>
            <br />
            <Input placeholder="Gender" type="text" onChange={e => setGender(e.target.value)} value={gender}/>
            <br />
            <Input placeholder="Update email" type="text" onChange={e => setEmail(e.target.value)} value={email}/>
            <br />
            <input
              className="upload-img"
              type="file"
              placeholder="Upload image"
            />
            <br />
            <button type="submit" className='edit-btn'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditPage;
