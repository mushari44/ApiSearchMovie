import { useEffect, useState } from "react";
import searchIcon from "/search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=135e2e84";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // if its undefined/empty it will return an empty array to avoid errors
    setMovies(data.Search ?? []); // Ensure that data.Search is not null
  };
   useEffect(() => {
     searchMovies(searchTerm);
   }, [searchTerm]);
  function handleSearchInput(event) {
    setSearchTerm(event.target.value);
  }
 

  return (
    <>
      <div className="app">
        <h1>Movie Land</h1>
        <div className="search">
          <input placeholder="Search for movies" value={searchTerm} onChange={handleSearchInput} ></input>
          <img src={searchIcon} alt="search" onClick={()=>searchMovies(searchTerm)}></img>
        </div>
        {movies.length > 0||searchTerm.length==0 ? (
          <div className="container">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
