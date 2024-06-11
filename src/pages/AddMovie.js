import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { addMovie } from "../api";
import "./AddMovie.css";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [message, setMessage] = useState("");
  const { apiKey } = useContext(AuthContext); // Get API key from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!title || !poster || !trailerLink) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      // Call addMovie function from API
      const response = await addMovie(
        { title, poster, trailer_link: trailerLink },
        apiKey
      );
      setMessage(response);
      // Clear input fields after successful addition
      setTitle("");
      setPoster("");
      setTrailerLink("");
    } catch (error) {
      setMessage("Failed to add movie: " + error.message);
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter movie title"
          />
        </div>
        <div className="input-container">
          <label>Poster URL:</label>
          <input
            type="url"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
            placeholder="Enter poster URL"
          />
        </div>
        <div className="input-container">
          <label>Trailer Link:</label>
          <input
            type="url"
            value={trailerLink}
            onChange={(e) => setTrailerLink(e.target.value)}
            required
            placeholder="Enter trailer link URL"
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
      {message && (
        <p
          className={`error-message ${
            message.includes("Failed") ? "" : "success-message"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddMovie;
