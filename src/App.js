import React, { useState, useEffect, useCallback } from "react";

import MovieCard from "./MovieCard";

import SearchIcon from "./search.svg";

import "./App.css";

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q="

const API_URL2= "https://collectionapi.metmuseum.org/public/collection/v1/objects/"

const App = () => {

const [searchTerm, setSearchTerm] = useState("star wars");

const [movies, setMovies] = useState([]);

const searchMovies = useCallback(async (title) => {

async function getter(int){

let data;

await fetch(API_URL2 + int)

.then(res => res.json())

.then(res => data = res)

.catch(err => { throw err });

return data;

}

async function getAndSetMovies(output){

console.log({output});

const firstTen = output.objectIDs.slice(0, 10);

const movieInfoForFirstTen = await Promise.all(firstTen.map(async (thing) => {

const metaDataAboutThing = await getter(thing);

return metaDataAboutThing;

}));

setMovies(movieInfoForFirstTen);

};

return fetch(API_URL + title)

.then(res => res.json())

.then(out => getAndSetMovies(out))

.catch(err => { throw err });

}, []);

useEffect(() => {

searchMovies(searchTerm);

}, [searchMovies, searchTerm]);

return (

<div className="app">

<h1>The MET Gallery</h1>

<div className="search">

<input

value={searchTerm}

onChange={(e) => setSearchTerm(e.target.value)}

placeholder="Search here"

/>

<img

src={SearchIcon}

alt="search"

onClick={() => searchMovies(searchTerm)}

/>

</div>

{movies?.length > 0 ? (

<div className="container" >

{movies.map((movie,index) => (

<div key={index}>

<MovieCard movie={movie} />

</div>

))}

</div>

) : (

<div className="empty">

<h2>Not found</h2>

</div>

)}

</div>

);

};

export default App;
