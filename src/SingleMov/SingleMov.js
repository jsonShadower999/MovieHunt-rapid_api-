import React from 'react';
import { useLocation } from 'react-router-dom';
import './SingleMov.css';

const SingleMov = () => {
  const location = useLocation();
  const { movie } = location.state || {};

  // Check if movie data is present
  if (!movie) {
    return <div className="single-mov-container">No movie data available</div>;
  }

  return (
    <div className="single-mov-container">
      <h1>{movie.titleText?.text || "Untitled"}</h1>
      <p>{movie.releaseYear?.year || "Unknown year"}</p>
      {movie.primaryImage?.url ? (
        <img
          src={movie.primaryImage.url}
          alt={movie.titleText?.text || "No image"}
        />
      ) : (
        <div className="no-image">No image available</div>
      )}
      <p>{movie.titleType?.text || "Unknown type"}</p>
    </div>
  );
};

export default SingleMov;
