import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Skills.scss';

const Skills = () => {
  const [skills, setSkills] = useState([]);


  return (
    <>
      <h2 className="head-text">Group Members</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          
        <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
            >
              <div
                className="app__flex"
              >
                <img src="https://scontent.fcgy2-1.fna.fbcdn.net/v/t1.6435-1/107829319_3224300467613010_2219887923472997306_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEas6s6r6dBu5xYNkcx_qOi8uhkMaURO9vy6GQxpRE7252cg9arnKJt6TwmRHdLHBPJ84ncSHzJ5LLHQt3Bu5AJ&_nc_ohc=ZR3dUoC46NoAX9vvpTY&_nc_ht=scontent.fcgy2-1.fna&oh=00_AfCJQfFnHsMR-MRlXW4_hBHjp-9W6em7I_JNjwn1rPh_Eg&oe=6447CA56" alt="Gani" />
              </div>
              <p className="p-text">Harzhedzmi</p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
            >
              <div
                className="app__flex"
              >
                <img src="https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-1/276138643_3127948430749924_2198032291957780957_n.jpg?stp=dst-jpg_p200x200&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGy9Vug6fWwtqvDX-KOK04bB7An6PT1m5EHsCfo9PWbkf43NnETMkVaC_OFU6uu6juDZIMIQ4tMSV6b9MdTJPlh&_nc_ohc=FPqGOjCqx8YAX84tqkI&_nc_ht=scontent.fcgy2-1.fna&oh=00_AfAIf3oTtSUAHz9LYKjKkAQd3nXDUKfOUzJIhFSV6q8pHw&oe=6424F926" alt="Cagampang" />
              </div>
              <p className="p-text">Moammar</p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
            >
              <div
                className="app__flex"
              >
                <img src="https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-1/325956663_561554112277988_6983241556946297644_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeFZmgShKPCuU3q2GnH1ve40X-epB20oK_xf56kHbSgr_LIaOuSq7G7QfzRTWRX0U3dbHX7gvXnzH3iK-5lq0RlP&_nc_ohc=kkKbL-6fnrQAX8kkPBO&_nc_ht=scontent.fcgy2-1.fna&oh=00_AfDvuSHXmWwKha-1d9dJn9q8gcOGa8gtQaD67tUzDvdKKw&oe=6424D4EE" alt="Turco" />
              </div>
              <p className="p-text">Iverson</p>
            </motion.div>

        </motion.div>
        

        <div className="app__skills-exp">

            <motion.div
              className="app__skills-exp-item"
            >
              <div className="app__skills-exp-year">
                <p className="bold-text" style={{color: "rgb(76, 112, 49)"}}>2022</p>
              </div>
              <motion.div className="app__skills-exp-works">
          
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for="Work Name"
                    >
                      <h4 className="bold-text">Animal Kingdom</h4>
                      <p className="p-text">BSIT 4B</p>
                    </motion.div>
                    <ReactTooltip
                      id="Wazzap"
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      Description
                    </ReactTooltip>

              </motion.div>
            </motion.div>

        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);
