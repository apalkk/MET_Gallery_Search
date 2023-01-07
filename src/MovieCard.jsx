import React from 'react';

const MovieCard = ({ movie: { objectID, objectName, primaryImage, title, period } }) => {
  return (
    <div className="movie" key={objectID}>
      <div>
        <p>{objectName}</p>
      </div>

      <div>
        <img src={primaryImage !== "N/A" ? primaryImage : "https://via.placeholder.com/400"} alt={title} />
      </div>

      <div>
        <span>{period}</span>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default MovieCard;