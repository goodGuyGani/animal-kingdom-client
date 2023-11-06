import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

function ScoresPage() {
  let { userid } = useParams();
  let { name } = useParams();
  const [finishedLesson, setFinishedLesson] = useState([""]);
  const [lesson, setLesson] = useState([""]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(
      `https://graceful-nightgown-wasp.cyclic.app/api/selectdistinctlesson/${userid}`
    ).then((response) => {
      setFinishedLesson(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("https://graceful-nightgown-wasp.cyclic.app/api/lessons").then(
      (response) => {
        setLesson(response.data);
      }
    );
  }, []);

  return (
    <>
      <div style={{ height: 100 }}></div>
      <center>
        <h2 className="head-text">
          Finished Lessons<span style={{ color: "#4c7031" }}></span>
        </h2>
      </center>
      <div className="cent1" style={{ marginLeft: "11%", marginBottom: 30 }}>
        <a
          className="previous1"
          style={{ marginRight: 10 }}
          onClick={() => {
            navigate(`/userpage/${name}`);
          }}
        >
          My Profile
        </a>
      </div>
      <div class="container" style={{ marginTop: 20 }}>
        <h3>Your Finished Lesson</h3>

        <div class="cards">
          {finishedLesson.map((finished) => (
            <div
              class="cards-inner"
              onClick={() => {
                navigate(`/quizresult/${userid}/${finished.lessonId}`);
              }}
            >
              <div style={{ marginLeft: 10 }}>
                {lesson
                  .filter((val) => {
                    return finished.lessonId === ""
                      ? val
                      : val.lessonId == finished.lessonId;
                  })
                  .map((val) => (
                    <>
                      <center>
                        <h4 style={{ fontWeight: "bold" }}>
                          {val.lessonTitle}
                        </h4>
                      </center>
                      <center>
                        <img
                          src={val.lessonImgUrl}
                          alt=""
                          style={{
                            height: 260,
                            width: 260,
                            objectFit: "cover",
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        />
                      </center>
                      <span style={{ fontSize: 14, color: "#46364a" }}>
                        {val.lessonDescription}
                      </span>
                    </>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ScoresPage;
