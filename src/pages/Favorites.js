import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites, handleRemoveMovieFromFavorites, handleMovieClick }) => {
  const handleRemove = (imdbid) => {
    handleRemoveMovieFromFavorites(imdbid);
  };

  return (
    <div className="favorites-container">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <div
              key={movie.imdbid}
              className="movie"
            >
              <img
                src={movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"}
                alt={movie.title}
                onClick={() => handleMovieClick(movie)} // Move the click handler here
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                
                <button onClick={() => handleRemove(movie.imdbid)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
