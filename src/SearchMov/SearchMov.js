import React, { useState, useEffect } from 'react';
import './SearchMov.css';

const SearchMov = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // For modal state

  useEffect(() => {
    if (query.length === 0) return;

    const fetchMovies = async () => {
      setLoading(true);
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          const response = JSON.parse(this.responseText);
          if (response.data && response.data.mainSearch && response.data.mainSearch.edges) {
            setMovies(response.data.mainSearch.edges || []);
          }
          setLoading(false);
        }
      });

      xhr.open('GET', `https://imdb231.p.rapidapi.com/api/imdb/main-search-query/v1?searchTerm=${query}&type=Top&limit=25&languageCountry=en_US`);
      xhr.setRequestHeader('x-rapidapi-key', 'f919c33789msh00378a6c4e22037p122ca5jsn3fbc728342b0');
      xhr.setRequestHeader('x-rapidapi-host', 'imdb231.p.rapidapi.com');

      xhr.send(null);
    };

    fetchMovies();
  }, [query]);

  const handleImageClick = (movie) => {
    // Set the selected movie to display in the modal
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null); // Close the modal
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <div className="movie-grid">
        {loading ? (
          <p>Loading...</p>
        ) : movies.length > 0 ? (
          movies.map((edge, index) => {
            const node = edge?.node?.entity;

            if (!node || !node.titleText || !node.titleText.text) {
              return null;
            }

            return (
              <div key={index} className="movie-item">
                <h2>{node.titleText.text}</h2>
                <p>ID: {node.id}</p>
                <p>Release Year: {node.releaseYear?.year}</p>
                <p>Title Type: {node.titleType?.text}</p>
                <div onClick={() => handleImageClick(node)}>
                  <img
                    src={node.primaryImage?.url}
                    alt={node.titleText.text}
                    className="movie-image"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {/* Modal */}
    
      {selectedMovie && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>&times;</span>
      <h2>{selectedMovie.titleText?.text}</h2>
      <p>
        Release Date:{" "}
        {`${selectedMovie.releaseDate?.year || "N/A"}-${
          selectedMovie.releaseDate?.month || "N/A"
        }-${selectedMovie.releaseDate?.day || "N/A"}`}
      </p>
      <img
        src={selectedMovie.primaryImage?.url}
        alt={selectedMovie.titleText.text}
        className="modal-movie-image"
      />
      <h3>Principal Credits</h3>
      <div className="credits-container">
        {selectedMovie.principalCredits[0]?.credits?.map((credit, index) => (
          <div key={index} className="credit-item">
            <p>{credit.name.nameText.text}</p>
            <img
              src={credit.name.primaryImage?.url || ""}
              alt={credit.name.nameText.text}
              className="credit-image"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default SearchMov;
