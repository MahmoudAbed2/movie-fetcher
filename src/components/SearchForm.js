import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchForm.css";

const SearchForm = ({ handleSearch }) => {
  const [isGoBackVisible, setIsGoBackVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(event);
    setIsGoBackVisible(true);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        name="query"
        defaultValue=""
        placeholder="Enter Movie Name"
      />
      <button className="search-button" type="submit">
        Search
      </button>
      {isGoBackVisible && (
        <button
          className="goback-button"
          type="button"
          onClick={() => window.location.reload()}
        >
          Go Back
        </button>
      )}
    </form>
  );
};

export default SearchForm;
