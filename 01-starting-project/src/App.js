import React, { useEffect, useState, useCallback } from "react";
import AddMovie from "./components/AddMovie";

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
      const response = await fetch(
        "https://react-post-request-6ba75-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }

      const data = await response.json();

      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformed = data.results.map((data) => {
      //   return {
      //     id: data.episode_id,
      //     title: data.title,
      //     releaseDate: data.release_date,
      //     openingText: data.opening_crawl,
      //   };
      // });

      setMovie(loadedData);
    } catch (error) {
      setError(error.message);
    }
    setisLoading(false);
  }, []);

  useEffect(() => {
    movieHandler();
  }, [movieHandler]);

  const cancelHandler = () => {
    setisLoading(false);
    setError(null);
  };

  const addMovieHandler = async (movie) => {
    // console.log(movie);
    const response_data = await fetch(
      "https://react-post-request-6ba75-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response_data.json();
    console.log(data);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={movieHandler}>Fetch Movies</button>
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
