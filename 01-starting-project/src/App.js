import React, { useEffect, useState,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);



  const movieHandler = useCallback(async () => {
    setisLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await response.json();

      const transformed = data.results.map((data) => {
        return {
          id: data.episode_id,
          title: data.title,
          releaseDate: data.release_date,
          openingText: data.opening_crawl,
        };
      });

      setMovie(transformed);
    } catch (error) {
      setError(error.message);
    }
    setisLoading(false);
  },[]);

  useEffect(()=>{
    movieHandler()
  },[movieHandler])

  const cancelHandler = () => {
    setisLoading(false)
    setError(null)
  };

  return (
    <React.Fragment>
      <section>
        <button >Fetch Movies</button>
        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </section>
      <section>
        {!isLoading && movie.length > 0 && <MoviesList movies={movie} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && movie.length === 0 && !error && <p>No Movies Found</p>}
        {error && <p>{error}</p>}
        {!isLoading && error && <p>No Movies Found</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
