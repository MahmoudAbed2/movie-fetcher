import React, { useContext } from "react";
import "./MovieList.css";
import { AuthContext } from "../contexts/AuthContext";

const MovieList = ({
  movies,
  handleMovieClick,
  handleAddToFavorites,
  handleRemoveMovie,
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div
          key={movie.imdbid}
          className="movie"
          onClick={() => handleMovieClick(movie)}
        >
          <img
            src={movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"}
            alt={movie.title}
          />
          <div className="movie-details">
            <h2>{movie.title}</h2>
            {user && ( // Conditionally render based on user login status
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the movie click event
                    handleAddToFavorites(movie);
                  }}
                >
                  Add to Favorites
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the movie click event
                    handleRemoveMovie(movie.imdbid);
                  }}
                >
                  Remove Movie
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
