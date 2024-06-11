import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieModal from "./components/MovieModal";
import AddMovie from "./pages/AddMovie";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { fetchApiKey, fetchMovies, deleteMovie } from "./api"; 
import AuthProvider from "./contexts/AuthContext";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const key = await fetchApiKey();
        setApiKey(key);
      } catch (error) {
        setError(error.message);
      }
    };

    getApiKey();
  }, []);

  useEffect(() => {
    if (apiKey) {
      const getMovies = async () => {
        setLoading(true);
        setError(null);

        try {
          const moviesData = await fetchMovies(query, apiKey);
          setMovies(
            moviesData.filter((movie) =>
              movie.title.toLowerCase().includes(query.toLowerCase())
            )
          );
        } catch (error) {
          setError(error.message);
        }

        setLoading(false);
      };

      getMovies();
    }
  }, [apiKey, query]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites)); // Parse the string back into an array
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputQuery = formData.get("query");

    setLoading(true);
    setError(null);

    try {
      const moviesData = await fetchMovies(inputQuery, apiKey);
      setMovies(
        moviesData.filter((movie) =>
          movie.title.toLowerCase().includes(inputQuery.toLowerCase())
        )
      );
      setQuery(inputQuery); // update the query state
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleAddToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      // Check if the movie is already in the favorites
      if (prevFavorites.some((favorite) => favorite.title === movie.title)) {
        setFavoriteMessage(`${movie.title} is already in favorites`);
        return prevFavorites;
      }

      const newFavorites = [...prevFavorites, movie];
      localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Save to Local Storage
      setFavoriteMessage(`${movie.title} added to favorites`);
      return newFavorites;
    });

    setTimeout(() => {
      setFavoriteMessage("");
    }, 3000); // Clear the message after 1 min
  };

  const handleRemoveMovieFromFavorites = (imdbid) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.imdbid !== imdbid
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update Local Storage
  };

  const handleRemoveMovie = async (imdbid) => {
    try {
      await deleteMovie(imdbid, apiKey);
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.imdbid !== imdbid)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  handleSearch={handleSearch}
                  favoriteMessage={favoriteMessage}
                  movies={movies}
                  handleMovieClick={handleMovieClick}
                  handleAddToFavorites={handleAddToFavorites}
                  handleRemoveMovie={handleRemoveMovie}
                />
              }
            />
            <Route path="/add-movie" element={<AddMovie />} />

            <Route
              path="/favorites"
              element={
                <Favorites
                  favorites={favorites}
                  handleRemoveMovieFromFavorites={
                    handleRemoveMovieFromFavorites
                  }
                  handleMovieClick={handleMovieClick} // Pass the handleMovieClick function to Favorites
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          {selectedMovie && (
            <MovieModal
              selectedMovie={selectedMovie}
              handleCloseModal={handleCloseModal}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
