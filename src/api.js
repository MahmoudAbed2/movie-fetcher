const API_BASE_URL = "http://localhost:8080/api";

export const fetchApiKey = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/keys`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error("Failed to fetch API key");
    }
  } catch (error) {
    throw new Error("Error fetching API key: " + error.message);
  }
};

export const fetchMovies = async (query, apiKey) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movies?query=${query}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    throw new Error("Failed to fetch movies: " + error.message);
  }
};

// Function to add a movie
export const addMovie = async (movieData, apiKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
    const data = await response.json();
    if (data.success) {
      return data.message; // Return success message
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("Failed to add movie: " + error.message);
  }
};

// Function to delete a movie
export const deleteMovie = async (imdbid, apiKey) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movies/${imdbid}?key=${apiKey}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data.success) {
      return data.message; // Return success message
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("Failed to delete movie: " + error.message);
  }
};
