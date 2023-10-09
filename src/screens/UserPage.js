import React, { useEffect, useState, useRef } from 'react'
import '../styles/UserPage.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

function UserPage() {
  const [loginStatus, setLoginStatus] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");
  const [myName, setMyName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("")
  const [animalCap, setAnimalCap] = useState(30)
  const [numStar, setNumStar] = useState("")
  const [lesson, setLesson] = useState([]);
  const [chapterState, setChapterState] = useState([])
  const navigate = useNavigate();
  const isInitialMount4 = useRef(true);
  const isInitialMount55 = useRef(true);
  

  Axios.defaults.withCredentials = true
  

  useEffect(() => {
    Axios.get("http://localhost:3001/api/login").then((response) => {
        if (response.data.loggedIn == true){
        setLoginStatus(response.data.user[0].userName)
        setUser(response.data.user[0].userName)
        setEmail(response.data.user[0].userEmail)
        setUserId(response.data.user[0].userId)
    } else if(response.data.loggedIn == false){
      navigate("/login");
    }
    })
  });

  

  useEffect(() => {
    if (isInitialMount4.current) {
       isInitialMount4.current = false;
    } else {
      Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn == true){
        setLoginStatus(response.data.user[0].userName)
        setUser(response.data.user[0].userName)
        setMyName(response.data.user[0].name)      
        setEmail(response.data.user[0].userEmail)
        setProfilePic(response.data.user[0].imgUrl)
    } else {
      navigate('/login');
      isInitialMount4.current = false;
    }
    })
    }
  });

  useEffect(() => {
    Axios.get('http://localhost:3001/api/lessons').then((response) => {
      setLesson(response.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/checkchapterstate`).then((response) => {
      setChapterState(response.data)
    })
  }, [])

  const logout = () => {
    Axios.get('http://localhost:3001/api/logout').then((response) => {
      navigate('/')
    })
  }
  


  
  useEffect(() => {
    if (isInitialMount55.current) {
      isInitialMount55.current = false;
    } else {
      Axios.get(`http://localhost:3001/api/starcheck/${userId}`).then((response) => {
        setAnimalCap(response.data[0].count);
        if(animalCap == 0){
          setNumStar(0)
        }
        if(animalCap << 1){
          setNumStar(10)
        }
        if(animalCap << 49 && animalCap >> 19 ){
          setNumStar(50)
        }
        if(animalCap >= 20 && animalCap <= 29){
          setNumStar(20)
        }
        if(animalCap >= 30 && animalCap <= 39){
          setNumStar(30)
        }
        if(animalCap >= 40 && animalCap <= 49){
          setNumStar(40)
        }
        
        
        
        isInitialMount55.current = false;
      })
    }
  });




  
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

    <div style={{height: 100}}></div>
    <center>
      <h2 className="head-text">My Profile<span style={{color: "#4c7031"}}></span></h2>
      </center>
    <div className="cent1" style={{marginLeft: "11%", marginBottom: 30}}>
      <a className='next1' onClick={() => {
          navigate(`/scorepage/${userId}/${user}`);
        }}>Finished Lessons</a>
        <a className='next1' style={{marginLeft: 10}} onClick={() => {
          navigate(`/mygallery/${userId}`);
        }}>My Gallery</a>
        <a className='next1' style={{marginLeft: 10}} onClick={() => {logout();}}>Logout</a>
    </div>
    <div className='container1'>
      {!profilePic == "" ? (<img style={{height: 300, width: 300, marginLeft: "11%", marginRight: "5%", objectFit: "cover"}} src={`http://localhost:3001/api/images/${profilePic}`} alt="profile"/>) : (<img style={{height: 300, width: 300, marginLeft: "11%", marginRight: "5%"}} src="https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg" alt="profile" />)}
      <div className='p-text1'>

      {numStar == 50 ? 
        <div className='rate1'>

        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        </div>: numStar == 40 ?
        <div className='rate1'>

        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        </div>: numStar == 30 ?
        <div className='rate1'>

        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        </div>: numStar == 20 ?
        <div className='rate1'>

        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        </div> : numStar === 10 ?
        <div className='rate1'>

        <span class="fa fa-star checked"></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        </div> :  numStar === 0 ?
        <div className='rate1'>

        <span class="fa fa-star "></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        </div> :
        <div className='rate1'>

        <span class="fa fa-star"></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        <span class="fa fa-star" style={{marginLeft: 30}}></span>
        </div>
      }
        
      <h2 className="head-text" style={{fontSize: 20}}><span style={{color: "black"}}>Username: </span>{user}<span style={{color: "#4c7031"}}></span></h2>
      <h2 className="head-text" style={{fontSize: 20}}><span style={{color: "black"}}>Name: </span>{myName}<span style={{color: "#4c7031"}}></span></h2>
      <h2 className="head-text" style={{fontSize: 20}}><span style={{color: "black"}}>Email: </span>{email}<span style={{color: "#4c7031"}}></span></h2>
      <h2 className="head-text" style={{fontSize: 20}}><span style={{color: "black"}}>Animal Captured: </span>{animalCap}<span style={{color: "#4c7031"}}></span></h2>
      </div>
    </div>
    <div class="container" style={{marginTop: 20}}>
      <h3>Your Current Lesson</h3>
      
      <div class="cards">

      {chapterState.filter((val) => {
          return userId === '' ? val : val.chapterStateUserId == userId 
        }).map((val) => (
        <div class="cards-inner" key={val.chapterStateId} 
        onClick={() => {
          navigate(`/chapter/${val.chapterStateLessonId}/${val.chapterStateChapterId}/${userId}`);
        }}
        >

          <div style={{marginLeft: 10}}>
          {lesson.filter((lesson) => {
          
          return userId === '' ? val : lesson.lessonId == val.chapterStateLessonId
        }).map((val) => (
            <h4 style={{fontWeight: "bold"}}>{val.lessonTitle}</h4>
            ))}
            <small><span>Chapter </span>{val.chapterStateChapterId}</small><br /><center>
            {lesson.filter((lesson) => {
          
          return userId === '' ? val : lesson.lessonId == val.chapterStateLessonId
        }).map((val) => (
              <img src={val.lessonImgUrl} alt="" style={{ height: 260, width: 260, objectFit: "cover", borderRadius: 10, marginTop: 10, marginBottom: 10 }} />
              ))}
              </center>
              {lesson.filter((lesson) => {
          
          return userId === '' ? val : lesson.lessonId == val.chapterStateLessonId
        }).map((val) => (
              <span style={{fontSize: 14, color: "#46364a"}}>{val.lessonDescription}</span>
              ))}
          </div>
          
        </div>
        ))}

          
        
      </div>
    </div></>
  )
}

export default UserPage