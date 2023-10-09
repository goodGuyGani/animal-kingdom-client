import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Axios from "axios";

function About2() {
  //const [abouts, setAbouts] = useState([]);

  const [abouts1, setAbouts1] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/about").then((response) => {
      setAbouts1(response.data);
    });
  }, []);

  /*
  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);
*/

  return (
    <>
      <div style={{ height: 100 }}></div>
      <h2 className="head-text">
        Learn About <span style={{ color: "#4c7031" }}>Animals</span> <br />
        And Explore Their <span style={{ color: "#4c7031" }}>Kingdom</span>
      </h2>

      <div className="app__profiles">
        {abouts1.map((val) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={val.aboutId}
          >
            <img src={val.imgUrl} alt={val.aboutName} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {val.aboutName}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {val.aboutDescription}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default About2;
