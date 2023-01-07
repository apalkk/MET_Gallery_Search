import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

let req = new XMLHttpRequest();

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q="
const API_URL2= "https://collectionapi.metmuseum.org/public/collection/v1/objects/"

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    function getObj(i){
        fetch(API_URL2 + i)
            .then(res => res.json())
            .then(res => {return(res.json)})
            .catch(err => { throw err });
    }

    useEffect(() => {
        searchMovies("Search");
    }, []);

    const searchMovies = async (title) => {
        fetch(API_URL + title)
            .then(res => res.json())
            .then(out => setMovies(getObj(out.objectIDs)))
            .catch(err => { throw err });
    };

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for movies"
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
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;
