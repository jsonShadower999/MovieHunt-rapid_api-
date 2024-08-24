import React, { useState, useEffect } from 'react';
import { Badge, Card, CardActionArea, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { Star as StarIcon, Close as CloseIcon } from '@mui/icons-material';
import './RatingSort.css'; // Custom CSS for animations and layout
import CustomPagination from '../Pagination/CustomPagination';

const Genres = () => {
  const [movies, setMovies] = useState([]);
  const [startRate, setStartRate] = useState(0);
  const [endRate, setEndRate] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch movies from API
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

  // Filter movies by rating
  const filteredMovies = movies.filter(movie => {
    const rating = parseFloat(movie.rating);
    return rating >= startRate && rating <= endRate;
  });

  // Handle movie card click
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  // Close popup
  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h1>Movie House</h1>

      {/* Rating Dropdowns */}
      <div>
        <label>
          Start Rating:
          <select value={startRate} onChange={(e) => setStartRate(Number(e.target.value))}>
            {[...Array(11).keys()].map((rate) => (
              <option key={rate} value={rate}>{rate}</option>
            ))}
          </select>
        </label>
        <label>
          End Rating:
          <select value={endRate} onChange={(e) => setEndRate(Number(e.target.value))}>
            {[...Array(11).keys()].map((rate) => (
              <option key={rate} value={rate}>{rate}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Movies Grid */}
      <div className="rate_class-grid">
        {filteredMovies.map((movie, index) => (
          <Card
            key={index}
            className="rate_class-card"
            onClick={() => handleCardClick(movie)}
          >
            <Badge
              badgeContent={movie.rating}
              color="primary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              classes={{ badge: 'rate_class-badge' }} // Use custom CSS class for badge
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={movie.image}
                  alt={movie.title}
                  className="rate_class-card-media"
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {movie.year}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" className="movie-description">
                    {movie.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Badge>
          </Card>
        ))}
      </div>
      <CustomPagination setPage={setPage} />

      {/* Movie Details Popup */}
      {selectedMovie && (
        <div className="rate_class-popup">
          <div className="rate_class-popup-content">
            <IconButton className="rate_class-close-btn" onClick={handleClosePopup}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" component="div">
              {selectedMovie.title}
            </Typography>
            <CardMedia
              component="img"
              height="300"
              image={selectedMovie.image}
              alt={selectedMovie.title}
              className="rate_class-popup-img"
            />
            <Typography variant="body1" color="textSecondary" component="p">
              {selectedMovie.description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Rating: {selectedMovie.rating}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Year: {selectedMovie.year}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default Genres;
