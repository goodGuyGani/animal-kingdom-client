import React, { useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';

function MyGallery() {
  let { userid } = useParams();
  let { name } = useParams();
  const [finishedLesson, setFinishedLesson] = useState([""]);
  const [lesson, setLesson] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getgallery/${userid}`).then((response) => {
      setFinishedLesson(response.data)
    })
  }, [])

  return (
    <>
      <div style={{ height: 100 }}></div>
      <center><h2 className="head-text">My Gallery<span style={{ color: "#4c7031" }}></span></h2></center>
      <div className="cent1" style={{marginLeft: "11%", marginBottom: 30}}>
      <a className='previous1' style={{marginRight: 10}} onClick={() => {
          navigate(`/userpage/${name}`);
        }}>My Profile</a>
    </div>
      <div class="container" style={{marginTop: 20}}>

      

      <h3>Your Identified Animals</h3>
      
      <div class="cards">

      {finishedLesson.map((val) => (
        <div class="cards-inner" 
        >

          <div style={{marginLeft: 10}}>
          
            <><center><h4 style={{ fontWeight: "bold", textTransform: "uppercase" }}>{val.animalName}</h4></center>
            <center>
                <img src={`http://localhost:3001/api/images/${val.imgName}`} alt="" style={{ height: 260, width: 260, objectFit: "cover", borderRadius: 10, marginTop: 10, marginBottom: 10 }} />

              </center><span style={{ fontSize: 14, color: "#46364a" }}>Identified At: {val.dateIdentified}</span></>

          </div>
          
        </div>
        ))}
          
        
      </div>
    </div>
    </>
  )
}

export default MyGallery