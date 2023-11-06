import { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "../styles/lessonPage.css";
import { Navbar } from "../components";
import { motion } from "framer-motion";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { div } from "@tensorflow/tfjs-core";

function LessonPage() {
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  let { lessonid } = useParams();
  let { userid } = useParams();
  const [lesson, setLesson] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [myId, setMyId] = useState([""]);
  const navigate = useNavigate();
  const [chapterCheck, setChapterCheck] = useState([""]);
  const [quizCheck, setQuizCheck] = useState(false);
  const [doneState, setDoneState] = useState("");
  const [quizTitle, setQuizTitle] = useState();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://graceful-nightgown-wasp.cyclic.app/api/login").then(
      (response) => {
        if (response.data.loggedIn == true) {
          setMyId(response.data.user[0].userId);
        } else {
          navigate("/login");
        }
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://graceful-nightgown-wasp.cyclic.app/api/lessons").then(
      (response) => {
        setLesson(response.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get(
      `https://graceful-nightgown-wasp.cyclic.app/api/lessons2/${lessonid}`
    ).then((response) => {
      setQuizTitle(response.data[0].lessonTitle);
    });
  }, []);

  useEffect(() => {
    Axios.get("https://graceful-nightgown-wasp.cyclic.app/api/chapters").then(
      (response) => {
        setChapters(response.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get(
      "https://graceful-nightgown-wasp.cyclic.app/api/checkchapterstate"
    ).then((response) => {
      setChapterCheck(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `https://graceful-nightgown-wasp.cyclic.app/api/checkchapterstate2/${userid}/${lessonid}`
    ).then((response) => {
      parseInt(setDoneState(response.data[0].chapterStateChapterId));
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `https://graceful-nightgown-wasp.cyclic.app/api/quizcheck2/${lessonid}`
    ).then((response) => {
      if (response.data.message == "Exist") {
        setQuizCheck(true);
      }
    });
  }, []);

  return (
    <>
      <div style={{ height: 100 }} className="lesson"></div>
      <div className="App">
        {lesson
          .filter((val) => {
            return lessonid === "" ? val : val.lessonId == lessonid;
          })
          .map((val) => (
            <>
              <h2 className="head-text">{val.lessonTitle}</h2>
              <hr className="line" />
              <div style={{ marginBottom: 50 }}></div>
              <div className="inputHolder"></div>
              <div className="mainWrapper1">
                <div className="mainContent1">
                  <div className="imageHolder1">
                    <img
                      src={val.lessonImgUrl}
                      alt={val.lessonTitle}
                      crossOrigin="anonymous"
                      style={{ borderRadius: 50 }}
                    />
                  </div>
                  <div className="resultsHolder1">
                    <div className="result">
                      <span className="name">Background</span>
                      <span className="confidence">{val.lessonBackground}</span>
                      <span className="name">Objectives</span>
                      <span className="confidence">
                        <ul style={{ marginLeft: 15 }}>
                          <li>{val.objective1}</li>
                          <li>{val.objective2}</li>
                          <li>{val.objective3}</li>
                        </ul>
                      </span>
                      <span className="name">Keywords</span>
                      <span className="confidence">{val.keywords}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        <div className="recentPredictions">
          <h2 style={{ marginLeft: 80 }}>Lesson Videos</h2>
          <hr className="line" />
          <motion.div
            animate={animateCard}
            transition={{ duration: 0.5, delayChildren: 0.5 }}
            className="app__work-portfolio"
          >
            {chapters
              .filter((val) => {
                return lessonid === "" ? val : val.lessonId == lessonid;
              })
              .map((val) => (
                <div className="app__work-item app__flex">
                  <div
                    className="app__work-img app__flex"
                    onClick={() => {
                      navigate(
                        `/chapter/${val.lessonId}/${val.chapterNum}/${userid}`
                      );
                    }}
                  >
                    <img src={val.chapterImgUrl} alt="" />

                    <motion.div
                      whileHover={{ opacity: [0, 1] }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                        staggerChildren: 0.5,
                      }}
                      className="app__work-hover app__flex"
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="app__work-content app__flex">
                    {val.chapterNum <= doneState ? (
                      <span
                        style={{
                          backgroundColor: "#4c7031",
                          width: "100%",
                          textAlign: "center",
                          color: "white",
                          borderRadius: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Finished
                      </span>
                    ) : null}

                    <h4 className="bold-text">Chapter {val.chapterNum}</h4>
                    <p className="p-text" style={{ marginTop: 10 }}>
                      {val.chapterTitle}
                    </p>
                  </div>
                </div>
              ))}
            {quizCheck ? (
              <div className="app__work-item app__flex">
                <div
                  className="app__work-img app__flex"
                  onClick={() => {
                    navigate(`/quizpage/${lessonid}/1`);
                  }}
                >
                  <img
                    src="https://www.trainerbubble.com/wp-content/uploads/edd/2015/09/Logo-Quiz.jpg"
                    alt=""
                  />

                  <motion.div
                    whileHover={{ opacity: [0, 1] }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      staggerChildren: 0.5,
                    }}
                    className="app__work-hover app__flex"
                  >
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </motion.div>
                </div>

                <div className="app__work-content app__flex">
                  <h4 className="bold-text">{quizTitle}</h4>
                  <p className="p-text" style={{ marginTop: 10 }}>
                    Quiz
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default LessonPage;
