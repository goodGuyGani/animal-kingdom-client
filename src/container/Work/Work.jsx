import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { AppWrap, MotionWrap } from '../../wrapper';

import './Work.scss';

const Work = () => {
  const [works1, setWorks1] = useState([]);

  const [filterWork1, setFilterWork1] = useState([]);

  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const [myId, setMyId] = useState([""]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/login").then((response) => {
      if (response.data.loggedIn == true){
      setLoginStatus(response.data.user[0].userName)
      setMyId(response.data.user[0].userId)
    }
    })
  }, [])

  useEffect(() => {
    Axios.get('http://localhost:3001/api/lessons').then((response) => {
      setWorks1(response.data)
      setFilterWork1(response.data)
    })
  }, [])

  return (
    <>
      <h2 className="head-text">Free <span style={{color: "#4c7031"}}>Animal</span> Lessons</h2>
      <input type="text" className="search-bar" placeholder='Search...'
      onChange={(e) => setSearch(e.target.value)}
      style={{color: "black"}}
      />

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        

        {works1.filter((val) => {
          return search.toLowerCase() === '' ? val : val.lessonTitle.toLowerCase().includes(search) || val.lessonDescription.toLowerCase().includes(search) || val.lessonTag.toLowerCase().includes(search) 
        }).map((val) => (
          <div className="app__work-item app__flex" key={val.lessonId}
          onClick={() => {!loginStatus ? (navigate('/login')) : (navigate(`/lesson/${val.lessonId}/${myId}`));}}
          > 
            <div
              className="app__work-img app__flex"
            >
              <img src={(val.lessonImgUrl)} alt={val.lessonTitle} />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >

                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{val.lessonTitle}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{val.lessonDescription}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{val.lessonTag}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'lessons',
  'app__primarybg',
);
