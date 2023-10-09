import React, { useState } from 'react'
import '../styles/Register.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [usernameReg, setUsernameReg] = useState([""])
  const [nameReg, setNameReg] = useState([""])
  const [emailReg, setEmailReg] = useState([""])
  const [passwordReg, setPasswordReg] = useState([""])

  const [image, setImage] = useState({ preview: '', data: '' })
  const [imgName, setImageName] = useState ("");
  const [status, setStatus] = useState('')

  const submit = () => {
    Axios.post("http://localhost:3001/api/register", {
      username: usernameReg, 
      name: nameReg,
      email: emailReg,
      password: passwordReg,
      imgUrl : imgName,
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    const response = await fetch('http://localhost:3001/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
    navigate('/login');
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
    setImageName(e.target.files[0].name);
  }

  return (
  <div class="login-page">
    <form class="form" onSubmit={handleSubmit}>
      <h2 style={{marginBottom: 30}}>Register</h2>
      <div class="login-form">
      <input type="text" placeholder="Username" name="usernameReg" onChange={(e) => {setUsernameReg(e.target.value)}}/>
      <input type="text" placeholder="Name" name="nameReg" onChange={(e) => {setNameReg(e.target.value)}} />
      <input type="text" placeholder="Email" name="emailReg" onChange={(e) => {setEmailReg(e.target.value)}} />
      <input type="password" placeholder="Password" name="passwordReg" onChange={(e) => {setPasswordReg(e.target.value)}} />
      {image.preview && <img src={image.preview} width='300' height='300' />}
      <input type='file' accept='image/*' name='file' onChange={handleFileChange} />
      <button onClick={submit} type='submit'>Register</button>
      <p class="message">Already registered? <a onClick={() => {navigate(`/login`);}} style={{cursor: "pointer"}}>Sign In</a></p>
    </div>
  </form>
</div>
  )
}

export default Register