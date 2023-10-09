import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';

function QuizResult() {
  let { userid } = useParams();
  let { lessonid } = useParams();
  const [lesson, setLesson] = useState([])
  const [myId, setMyId] = useState([""]);
  const [myName, setMyName] = useState([""]);
  const [lessonName, setLessonName] = useState([""]);
  const [correctCount, setCorrectCount] = useState("");
  const isInitialRef9 = useRef(true);

  const navigate = useNavigate();


  


  useEffect(() => {
    if (isInitialRef9.current) {
      isInitialRef9.current = false;
    } else {
      Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn == true){
      setMyId(response.data.user[0].userId)
      setMyName(response.data.user[0].name)
    } else {
      navigate('/login');
      isInitialRef9.current = false;
    }
    })
    }
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/getlesson/${lessonid}`).then((response) => {
      setLessonName(response.data[0].lessonTitle)
    })
  }, [])

  

  
 

  useEffect(() => {
    Axios.get('http://localhost:3001/api/lessons').then((response) => {
      setLesson(response.data)
    })
  }, [])

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/checkanswers/${userid}/${lessonid}`).then((response) => {
      setCorrectCount(response.data[0].count)
    })
  }, [])

  const retry = () => {
    Axios.delete(`http://localhost:3001/api/deleteanswers/${userid}/${lessonid}`)
  }

  const finlesson = () => {
    Axios.delete(`http://localhost:3001/api/deletechapterstate/${userid}/${lessonid}`)
  }

  const download = () => {
    Axios.get(`http://localhost:3001/api/createcerf/${userid}/${lessonid}/${myName}/${lessonName}`).then((response) => {
    });

    
    Axios.get(`http://localhost:3001/api/getcerf/${myName}/${lessonName}`).then((response) => {
    });
    

  }

  return (
    <><div style={{height: 100}}></div>
    {lesson.filter((val) => {
          return lessonid === '' ? val : val.lessonId == lessonid
        }).map((val) => (
          <h2 className="head-text">{val.lessonTitle}</h2>
        ))}
    <center>
      <div className='App2'>
    <div class="quiz-container" id="quiz">
    <div class="quiz-header">
      <h1 style={{fontWeight: "bold"}}>You have completed the Quiz</h1>
      <h1 style={{fontWeight: "bold"}}>You got {correctCount} out 10 right!</h1>
      <button className='next3' style={{margin: 8, width: "70%"}} onClick={() => {retry(); navigate(`/quizpage/${lessonid}/1`)}}>Retry</button>
      <button className='next3' style={{margin: 8, width: "70%"}} onClick={() => {download()}}>Get Certificate</button>
    </div>
    <button className='button3' onClick={() => {finlesson(); navigate(`/scorepage/${myId}/${myName}`)}}>Finish Lesson</button>
  </div></div></center><div style={{height: 100}}></div></>
  )
}

export default QuizResult