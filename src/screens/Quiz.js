import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import '../styles/Quiz.css';
import Axios from 'axios';


function Quiz() {
  let { lessonid } = useParams();
  let { quiznum } = useParams();
  const [lesson, setLesson] = useState([])
  const [quiz, setQuiz] = useState([]);
  const [quiz2, setQuiz2] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [myId, setMyId] = useState([""]);
  const [message, setMessage] = useState("")
  const [loginStatus, setLoginStatus] = useState("");
  const isInitialRef = useRef(true);
  const isInitialRef2 = useRef(true);
  const isInitialRef3 = useRef(true);

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true

  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false;
    } else {
      Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn == true){
      setLoginStatus(response.data.user[0].userName)
      setMyId(response.data.user[0].userId)
    } else {
      navigate('/login');
      isInitialRef.current = false;
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
    Axios.get(`http://localhost:3001/api/quiz2/${lessonid}`).then((response) => {
      setQuiz2(response.data)
    })
  }, [])

  
  

  

  useEffect(() => {
    if (isInitialRef2.current) {
      isInitialRef2.current = false;
    } else {
        Axios.get(`http://localhost:3001/api/quiz/${lessonid}/${quiznum}`).then((response) => {
          setQuiz(response.data)
          setCorrectAnswer(response.data[0].correct_answer)

          isInitialRef2.current = false;
        })
    }
  });



// http://localhost:3001

  const submitAnswer = (answer) => {
    if(answer === ""){
      setMessage("Please Pick an Answer")
    } 
    else if(answer === correctAnswer){
      Axios.post("http://localhost:3001/api/answers", {
      userId: myId,
      lessonId: lessonid,
      quizNum: quiznum,
      answerState: "Correct"
    });

    } else{
      Axios.post("http://localhost:3001/api/answers", {
      userId: myId,
      lessonId: lessonid,
      quizNum: quiznum,
      answerState: "Wrong"
    });
    }

    
  };


  return (
    <><div style={{height: 100}}></div>
    {lesson.filter((val) => {
          return lessonid === '' ? val : val.lessonId == lessonid
        }).map((val) => (
          <h2 className="head-text">{val.lessonTitle}</h2>
        ))}
        {quiz2.filter((val) => {
          return quiznum === '' ? val : val.quizNum == quiznum
        }).map((val) => (
    <center>
      <div className='App2'>
    <div class="quiz-container" id="quiz">
    <div class="quiz-header">
      <h1 style={{fontWeight: "bold"}}>{val.question}</h1>
      {message}
      <div style={{marginTop: 20}}>
        <button className='next3' style={{margin: 8}} onClick={() => {submitAnswer(`${val.optionA}`); {quiznum == 10 ? navigate(`/quizresult/${myId}/${lessonid}`) : navigate(`/quizpage/${lessonid}/${val.quizNum + 1}`);}; }}>{val.optionA}</button><br />
        <button className='next3' style={{margin: 8}} onClick={() => {submitAnswer(`${val.optionB}`); {quiznum == 10 ? navigate(`/quizresult/${myId}/${lessonid}`) : navigate(`/quizpage/${lessonid}/${val.quizNum + 1}`);}; }}>{val.optionB}</button><br />
        <button className='next3' style={{margin: 8}} onClick={() => {submitAnswer(`${val.optionC}`); {quiznum == 10 ? navigate(`/quizresult/${myId}/${lessonid}`) : navigate(`/quizpage/${lessonid}/${val.quizNum + 1}`);}; }}>{val.optionC}</button><br />
        <button className='next3' style={{margin: 8}} onClick={() => {submitAnswer(`${val.optionD}`); {quiznum == 10 ? navigate(`/quizresult/${myId}/${lessonid}`) : navigate(`/quizpage/${lessonid}/${val.quizNum + 1}`);}; }}>{val.optionD}</button>
      </div>
    </div>
    <button className='button3'>{val.quizNum} of 10</button>
  </div></div></center>))}<div style={{height: 100}}></div></>
  )
}

export default Quiz