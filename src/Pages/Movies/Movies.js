import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Badge, IconButton, Dialog, DialogContent, DialogTitle, Icon } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './Movies.css'; // Ensure CSS file is correctly imported
import CustomPagination from '../../Pagination/CustomPagination';
const genresList = [
  "Action", "Adventure", "Animation", "Comedy", "Documentary", "Drama", 
  "Family", "Crime", "Fantasy", "History", "Mystery", "Romance", "TV Movies", 
  "Thriller", "War", "Western"
];

const Movies = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]); // Store initial movies
  const [popupMovie, setPopupMovie] = useState(null); // To handle the popup for the clicked movie
  const [page, setPage] = useState(1);

  const API_KEY = 'c6549ae7'; // OMDB API key

  // Fetch initial movies
  useEffect(() => {
    fetchInitialMovies();
  }, []);

  const fetchInitialMovies = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=Comedy&Action`);
      if (response.data.Search) {
        setInitialMovies(response.data.Search.slice(0, 20)); // Store initial movies and limit to 20
        setMovies(response.data.Search.slice(0, 20)); // Initially show these movies
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching initial movies:", error);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
  };

  // Fetch movies based on selected genres
  useEffect(() => {
    if (selectedGenres.length > 0) {
      fetchMoviesForGenres();
    } else {
      setMovies(initialMovies); // If no genres are selected, show initial movies
    }
  }, [selectedGenres]);

  const fetchMoviesForGenres = async () => {
    const genreQuery = selectedGenres.join(" ");
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&type=movie&s=${genreQuery}`);
      if (response.data.Search) {
        setMovies(response.data.Search.slice(0, 20)); // Limit to 20 results
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies for genres:", error);
    }
  };

  const handleCardClick = (movie) => {
    setPopupMovie(movie); // Set the clicked movie data in state to trigger the popup
  };

  const closePopup = () => {
    setPopupMovie(null); // Close the popup
  };

  return (
    <div>
      {/* Genre Selection */}
      <div className="genres-tabs">
        {genresList.map((genre) => (
          <label key={genre} className="genre-tab">
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="movies-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Card
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleCardClick(movie)}
              raised
            >
              <div className="movie-card-inner">
                <div className="movie-card-front">
                  <CardMedia
                    component="img"
                    image={movie.Poster}
                    alt={movie.Title}
                    className="movie-card-img"
                  />
                  <Badge
                    badgeContent={movie.imdbRating}
                    color="primary"
                    className="rate_class-badge"
                  >
                    <Typography variant="caption" color="text.secondary">
                      Rating
                    </Typography>
                  </Badge>
                </div>
                <div className="movie-card-back">
                  <CardContent>
                    <Typography variant="h6">{movie.Title}</Typography>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>No movies found for the selected genres.</p>
        )}
      </div>
      <CustomPagination setPage={setPage} />

      {/* Popup for Movie Details */}
      {popupMovie && (
        <Dialog
          open={!!popupMovie}
          onClose={closePopup}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {popupMovie.Title}
            <IconButton
              aria-label="close"
              onClick={closePopup}
              sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <img
              src={popupMovie.Poster}
              alt={popupMovie.Title}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <Typography variant="body1">Year: {popupMovie.Year}</Typography>
            <Typography variant="body2">{popupMovie.Plot}</Typography>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Movies;
