import React, { useState, useEffect } from 'react';
import './YearSort.css'; // Import the CSS file
import CustomPagination from '../Pagination/CustomPagination';
const Genres = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [startYear, setStartYear] = useState(1900);
  const [loading, setLoading] = useState(true);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [selectedMovie, setSelectedMovie] = useState(null); // To hold the selected movie for the popup

  // Fetch the data from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://imdb-top-1002.p.rapidapi.com/top_100_movies',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': 'f919c33789msh00378a6c4e22037p122ca5jsn3fbc728342b0',
              'x-rapidapi-host': 'imdb-top-1002.p.rapidapi.com',
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on year range
  const filteredMovies = movies.filter(movie => {
    return movie.year >= startYear && movie.year <= endYear;
  });

  // Handle movie card click
  const handleCardClick = (movie) => {
    setSelectedMovie(movie); // Set the selected movie to show in popup
  };

  // Handle close popup
  const handleClosePopup = () => {
    setSelectedMovie(null); // Reset the selected movie to close the popup
  };

  return (
    <div>
      <h1>Movie House</h1>

      {/* Year Range Dropdowns */}
      <div>
        <label>
          Start Year:
          <select value={startYear} onChange={(e) => setStartYear(Number(e.target.value))}>
            {[...Array(new Date().getFullYear() - 1900 + 1)].map((_, i) => (
              <option key={i} value={1900 + i}>{1900 + i}</option>
            ))}
          </select>
        </label>
        <label>
          End Year:
          <select value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}>
            {[...Array(new Date().getFullYear() - 1900 + 1)].map((_, i) => (
              <option key={i} value={1900 + i}>{1900 + i}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Movies Grid */}
      <div className="movies-grid">
        {filteredMovies.map((movie, index) => (
          <div
            key={index}
            className="movie-card"
            onClick={() => handleCardClick(movie)} // On click, show the popup
          >
            <div className="card-inner">
              <div className="card-front">
                <img src={movie.image} alt={movie.title} />
              </div>
              <div className="card-back">
                <h2>{movie.title}</h2>
                <p>{movie.year}</p>
                <p>Rating: {movie.rating}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CustomPagination setPage={setPage} />

      {/* Movie Details Popup */}
      {selectedMovie && (
        <div className="popup">
          <div className="popup-content_y">
            <span className="close-btn" onClick={handleClosePopup}>X</span>
            <h2>{selectedMovie.title}</h2>
            <img src={selectedMovie.image} alt={selectedMovie.title} />
            <p>{selectedMovie.description}</p>
            <p>Rating: {selectedMovie.rating}</p>
            <p>Year: {selectedMovie.year}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Genres;
