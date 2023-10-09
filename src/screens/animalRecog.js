import { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "../styles/animalrecog.css";
import Axios from "axios";

function AnimalRecog() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [myId, setMyId] = useState([""]);
  const [ifLogin, setIfLogin] = useState(false);

  const [image, setImage] = useState({ preview: "", data: "" });
  const [imgName, setImageName] = useState("");
  const [urlImage, setUrlImage] = useState("");

  const [myImage, setMyImage] = useState("");

  const isInitialMount30 = useRef(true);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();

  var current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount30.current) {
      isInitialMount30.current = false;
    } else {
      Axios.get("http://localhost:3001/api/login").then((response) => {
        if (response.data.loggedIn == true) {
          setMyId(response.data.user[0].userId);
          setIfLogin(true);
        } else {
          isInitialMount30.current = false;
        }
      });
    }
  });

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
      console.log(url);
    } else {
      setImageURL(null);
    }

    if (ifLogin) {
      const img = {
        preview: URL.createObjectURL(files[0]),
        data: files[0],
      };
      setImage(img);
      setImageName(files[0]);

      setMyImage(files[0].name);
    }
  };

  const identify = async () => {
    console.log(urlImage);

    const results = await model.classify(imageRef.current);
    setResults(results);

    if (ifLogin && textInputRef.current.value == "") {
      let formData = new FormData();
      formData.append("file", image.data);
      const response = await fetch("http://localhost:3001/image", {
        method: "POST",
        body: formData,
      });

      Axios.post("http://localhost:3001/api/galanimal", {
        userid: myId,
        imgname: myImage,
        animalname: results[0].className,
        dateidentified: date,
      });
    } else if (ifLogin && !textInputRef.current.value == "") {
      const newImg = Math.random().toString(36).substring(2, 7);

      Axios.post("http://localhost:3001/api/galanimal2", {
        userid: myId,
        imgname: newImg + ".png",
        animalname: results[0].className,
        dateidentified: date,
        imglink: urlImage,
      });
    }

    textInputRef.current.value = "";
  };

  const handleOnChange = (e) => {
    setImageURL(e.target.value);
    setUrlImage(e.target.value);
    setResults([]);
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    if (imageURL) {
      setHistory([imageURL, ...history]);
    }
  }, [imageURL]);

  if (isModelLoading) {
    return (
      <>
        <div style={{ height: 140 }}></div>
        <center>
          <h2 className="load">
            <img src={require("../assets/spinner3.gif")} alt="loading..." />
            <br /> Model Loading...
          </h2>
        </center>
      </>
    );
  }

  return (
    <div className="app__container app__testimonial">
      <div className="app__wrapper app__flex">
        <div className="App">
          <h2 className="head-text" style={{ marginTop: 50 }}>
            Animal Recognition
          </h2>
          <div style={{ marginBottom: 50 }}></div>
          <div className="inputHolder">
            <input
              type="file"
              accept="image/*"
              className="uploadInput"
              onChange={uploadImage}
              ref={fileInputRef}
            />
            <button
              className="uploadImage"
              onClick={triggerUpload}
              style={{ fontWeight: "bold" }}
            >
              Upload Image
            </button>
            <span className="or">OR</span>
            <input
              type="text"
              placeholder="Paster image URL"
              ref={textInputRef}
              onChange={handleOnChange}
            />
          </div>
          <div className="mainWrapper">
            <div className="mainContent">
              <div className="imageHolder">
                {imageURL && (
                  <img
                    src={imageURL}
                    alt="Upload Preview"
                    crossOrigin="anonymous"
                    ref={imageRef}
                  />
                )}
              </div>
              {results.length > 0 && (
                <div className="resultsHolder">
                  {results.map((result, index) => {
                    return (
                      <div className="result" key={result.className}>
                        <span className="name">{result.className}</span>
                        <span className="confidence">
                          Confidence level:{" "}
                          {(result.probability * 100).toFixed(2)}%{" "}
                          {index === 0 && (
                            <span className="bestGuess">Best Guess</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {imageURL && (
              <button className="button" onClick={identify}>
                Identify Image
              </button>
            )}
          </div>
          {history.length > 0 && (
            <div className="recentPredictions">
              <h2>Recent Images</h2>
              <div className="recentImages">
                {history.map((image, index) => {
                  return (
                    <div className="recentPrediction" key={`${image}${index}`}>
                      <img
                        src={image}
                        alt="Recent Prediction"
                        onClick={() => setImageURL(image)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimalRecog;
