import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiUrl = 'https://api.themoviedb.org/3/search/movie';

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const searchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          query: searchTerm,
        }
      });

      setMovies(response.data.results);
    } catch (err) {
      setError('An error occurred while fetching movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Movie Search API</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? 'Light' : 'Dark'}
      </button>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter movie title"
        />
        <button onClick={searchMovies}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>Year: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;