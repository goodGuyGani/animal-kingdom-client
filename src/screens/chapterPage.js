/* eslint-disable jsx-a11y/anchor-is-valid */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import React from "react";
import "../styles/chapterPage.css";

export default function ChapterPage() {
  let { lessonid } = useParams();
  let { chapternum } = useParams();
  let { userid } = useParams();
  const [chapter, setChapter] = useState([]);
  const [chapterState, setChapterState] = useState([]);
  const navigate = useNavigate();

  const [myId, setMyId] = useState([""]);
  const [chapterId, setChapterId] = useState([""]);
  const [lessonId, setLessonId] = useState([""]);
  const [check1, setCheck1] = useState([]);
  const [checkingChap, setCheckingChap] = useState();
  const [checkingChap2, setCheckingChap2] = useState(false);

  const isInitialMount = useRef(true);
  const isInitialMount2 = useRef(true);
  const isInitialMount3 = useRef(true);

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      Axios.post("http://localhost:3001/api/checkchapter", {
        lesson: lessonid,
        chapter: chapternum,
      }).then((response) => {
        if (response.data.message == "Not Exist") {
          setChapterState(response.data.message);
          navigate(`/quizpage/${lessonid}/1`);
          isInitialMount.current = false;
        }
      });
    }
  });

  useEffect(() => {
    Axios.get("http://localhost:3001/api/chapters").then((response) => {
      setChapter(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `http://localhost:3001/api/checkchapterstate2/${userid}/${lessonid}`
    ).then((response) => {
      setCheckingChap(response.data[0].chapterStateChapterId);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `http://localhost:3001/api/checkchapterstate3/${userid}/${lessonid}/${
        chapternum + 1
      }`
    ).then((response) => {
      if (response.data.message == "Exist") {
        setCheckingChap2(true);
      } else {
        setCheckingChap2(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      Axios.post("http://localhost:3001/api/checkchapter2", {
        user: myId,
        lesson: lessonid,
        chapter: chapternum,
      }).then((response) => {
        if (response.data.message == "Done") {
          setCheck1(response.data.message);
          isInitialMount2.current = false;
        }
      });
    }
  });

  useEffect(() => {
    if (isInitialMount3.current) {
      isInitialMount3.current = false;
    } else {
      Axios.get("http://localhost:3001/api/login").then((response) => {
        if (response.data.loggedIn == true) {
          setMyId(response.data.user[0].userId);
        } else {
          navigate("/login");
          isInitialMount3.current = false;
        }
      });
    }
  });

  const submit = () => {
    Axios.delete(
      `http://localhost:3001/api/deletechapterstate/${userid}/${lessonid}`
    );

    Axios.post("http://localhost:3001/api/chapstateinsert", {
      username: myId,
      lesson: lessonid,
      chapter: chapternum,
    });
    setCheck1("Not Done");
  };

  return (
    <>
      {chapter
        .filter((val) => {
          return lessonid === ""
            ? val
            : val.lessonId == lessonid && val.chapterNum == chapternum;
        })
        .map((val) => (
          <>
            <div style={{ height: 100 }} className="lesson"></div>
            <div className="App">
              <h2 className="head-text">
                Chapter {chapternum}: {val.chapterTitle}
              </h2>
              <hr className="line" style={{ width: "98%" }} />
              <div style={{ marginBottom: 50 }}></div>
              <div className="inputHolder"></div>
              {check1 == "Done" ? (
                <div
                  className="next"
                  style={{
                    borderRadius: 0,
                    margin: 9,
                    fontWeight: "bold",
                    padding: 5,
                  }}
                >
                  <center>Finished</center>
                </div>
              ) : (
                <></>
              )}
              <div className="mainWrapper1">
                <div className="mainContent1">
                  <div class="container-iframe">
                    <iframe
                      class="responsive-iframe"
                      src={val.chapterVideoUrl}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="allowfullscreen"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div className="recentPredictions">
                <hr className="line1" />
                <h2 style={{ marginLeft: "3%" }} className>
                  About Video
                </h2>
                <div className="resultsHolder1">
                  <div
                    className="result"
                    style={{ backgroundColor: "white", borderColor: "white" }}
                  >
                    <span className="name" style={{ color: "black" }}>
                      Background
                    </span>
                    <span className="confidence" style={{ color: "black" }}>
                      {val.chapterDescription}
                    </span>
                    <span className="name">Objectives</span>
                    <span className="confidence"></span>
                  </div>
                </div>

                <center className="cent">
                  {val.chapterNum == 1 ? (
                    <a
                      className="next"
                      onClick={() => {
                        submit();
                        navigate(
                          `/chapter/${val.lessonId}/${
                            val.chapterNum + 1
                          }/${userid}`
                        );
                      }}
                    >
                      Next &raquo;
                    </a>
                  ) : (
                    <>
                      <a
                        className="previous"
                        onClick={() => {
                          navigate(
                            `/chapter/${val.lessonId}/${
                              val.chapterNum - 1
                            }/${userid}`
                          );
                        }}
                      >
                        &laquo; Prev
                      </a>
                      <a
                        className="next"
                        onClick={() => {
                          submit();
                          navigate(
                            `/chapter/${val.lessonId}/${
                              val.chapterNum + 1
                            }/${userid}`
                          );
                        }}
                      >
                        Next &raquo;
                      </a>
                    </>
                  )}
                </center>
              </div>
            </div>
          </>
        ))}
    </>
  );
}
