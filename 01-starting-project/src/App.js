import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movie,setMovie]=useState([]);
  const [isLoading,setisLoading]=useState(false)
  const movieHandler = async () => {
    setisLoading(true)
    const response = await fetch('https://swapi.py4e.com/api/films');
    const data = await response.json();
    
    const transformed=data.results.map(data =>{
      return {
        id:data.episode_id,
        title:data.title,
        releaseDate:data.release_date,
        openingText:data.opening_crawl
      }
    })

    setMovie(transformed)
    setisLoading(false)
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={movieHandler}>Fetch Movies</button>
      </section>
      <section>
       {!isLoading && movie.length > 0 && <MoviesList movies={movie} />}
       {isLoading && <p>Loading...</p>}
       {!isLoading && movie.length === 0 && <p>No Movies Found</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
