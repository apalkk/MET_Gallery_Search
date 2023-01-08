import React from 'react';

const MovieCard = ({ movie }) => {

console.log(movie);

return (

<div className="movie" key={movie?.objectID}>

<div>

<p>{movie?.objectName}</p>

</div>

<div>

<img src={movie?.primaryImage !== "N/A" ? movie?.primaryImage : "https://via.placeholder.com/400"} alt={movie?.title} />

</div>

<div>

<span>{movie?.period}</span>

<h3>{movie?.title}</h3>

</div>

</div>

);

}

export default MovieCard;
