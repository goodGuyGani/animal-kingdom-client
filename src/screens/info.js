import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../styles/Info.css';

export default function Info() {
  const [animal, setAnimal] = useState([]);
  const navigate = useNavigate();


  return (
    <>
    <div style={{height: 100}}></div>
    <center>
      <h2 className="head-text"><span style={{color: "#4c7031"}}>Animal</span> Information</h2>
    </center>
    <div className='info'>
    <div className='infocontainer'>
      <div className='box' style={{cursor: "pointer"}} onClick={() => {navigate(`/dogs`);}}>
        <div className='content'>
          <img src="https://cdn.pixabay.com/photo/2016/10/10/14/13/dog-1728494__480.png" alt="" />
          <h4 className="bold-text">Find Doggo</h4>
          <p className="p-text" style={{ marginTop: 10 }}>Learn information about dogs, their height, weight, breed group and many more. </p>
        </div>
      </div>

      

      <div className='box' style={{cursor: "pointer"}} onClick={() => {navigate(`/cats`);}}>
        <div className='content'>
          <img src="https://cdn.pixabay.com/photo/2016/10/14/17/55/cat-1740777_960_720.png" alt="" />
          <h4 className="bold-text">Find Kitty</h4>
          <p className="p-text" style={{ marginTop: 10 }}>Learn information about cats, their height, weight, breed group and many more. </p>
        </div>
      </div>
      
      
    </div>
    </div>
    </>
  )
}
