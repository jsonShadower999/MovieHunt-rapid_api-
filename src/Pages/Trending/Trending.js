import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";
import SingleContent from "../../SingleContent/SingleContent";
import CustomPagination from "../../Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // To store the selected movie

  const fetchTrending = async () => {
    try {
      const response = await fetch('https://imdb8.p.rapidapi.com/title/v2/get-popular?first=20&country=US&language=en-US', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'f919c33789msh00378a6c4e22037p122ca5jsn3fbc728342b0',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const d_d = data.data.movies.edges;
        setContent(d_d); // Update the state with the fetched movies
      } else {
        console.error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie); // Store the clicked movie's data
  };

  const closePopup = () => {
    setSelectedMovie(null); // Close the popup
  };

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      
      <div className="trending">
        {content && content.map((c) => (
          <div 
            key={c.node.id} 
            className="movie-card"
            onClick={() => handleCardClick(c.node)} // On card click, show popup
          >
            <div className="movie-card-inner">
              <div className="movie-card-front">
                <img 
                  className="poster bounce" 
                  src={c.node.primaryImage.url} 
                  alt={c.node.titleText.text}
                />
              </div>
              <div className="movie-card-back">
                <h2>{c.node.titleText.text}</h2>
                <p>{c.node.releaseDate.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <CustomPagination setPage={setPage} />

      {/* Movie Detail Popup */}
      {selectedMovie && (
        <div className="movie-popup">
          <div className="popup-content">
            <span className="close-popup" onClick={closePopup}>×</span>
            <h2>{selectedMovie.titleText.text} ({selectedMovie.releaseDate.year})</h2>
            <img src={selectedMovie.primaryImage.url} alt={selectedMovie.titleText.text} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Trending;
