import React from "react";
import SearchForm from "../components/SearchForm";
import MovieList from "../components/MovieList";
import "./Home.css";

const Home = ({
  handleSearch,
  favoriteMessage,
  movies,
  handleMovieClick,
  handleAddToFavorites,
  handleRemoveMovie,
}) => {
  return (
    <>
      <SearchForm handleSearch={handleSearch} />
      {favoriteMessage && <p className="favorite-message">{favoriteMessage}</p>}
      <MovieList
        movies={movies}
        handleMovieClick={handleMovieClick}
        handleAddToFavorites={handleAddToFavorites}
        handleRemoveMovie={handleRemoveMovie}
      />
    </>
  );
};

export default Home;
