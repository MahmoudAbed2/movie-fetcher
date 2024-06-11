import React from "react";
import "./MovieModal.css";

const MovieModal = ({ selectedMovie, handleCloseModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <h2>{selectedMovie.title}</h2>
        <p>{selectedMovie.year}</p>
        {selectedMovie.poster !== "N/A" && (
          <img src={selectedMovie.poster} alt={selectedMovie.title} />
        )}
        {selectedMovie.trailer_link && ( 
          <div className="trailer">
            <iframe
              className="trailer-iframe"
              title="trailer"
              src={selectedMovie.trailer_link}
              allowFullScreen
              
            ></iframe>
          </div>
        )}
        <div className="button-container">
          <button
            className="goback-button"
            type="button"
            
            onClick={() => window.location.reload()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
