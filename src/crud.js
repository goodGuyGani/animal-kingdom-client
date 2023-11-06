import React, { useState, useEffect } from "react";
import "./styles/crud.css";
import Axios from "axios";

export default function CrudApp() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState([""]);

  useEffect(() => {
    Axios.get("https://graceful-nightgown-wasp.cyclic.app/api/get").then(
      (response) => {
        setMovieList(response.data);
      }
    );
  }, []);

  const submitReview = () => {
    Axios.post("https://graceful-nightgown-wasp.cyclic.app", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(
      `https://graceful-nightgown-wasp.cyclic.app/api/delete/${movie}`
    );
  };

  //create a function that inputs a string and capitalizes it

  const updateReview = (movie) => {
    Axios.put("https://graceful-nightgown-wasp.cyclic.app/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="Aap">
      <h2>Crud App</h2>

      <div className="form">
        <label>Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(val.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                id="updateInput"
                onChange={(e) => {
                  setNewReview(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  updateReview(val.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
