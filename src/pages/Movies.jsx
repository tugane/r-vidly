import axios from "axios";
import React, { useEffect, useState } from "react";
import MoviesList from "../components/Movies/MoviesList";
import NewMovie from "../components/Movies/NewMovie";

function Movies() {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getGenres();
    getMovies();
  }, []);
  const getGenres = () => {
    axios
      .get("http://127.0.0.1:8000/api/genres")
      .then((response) => setGenres(response.data))
      .catch((err) => console.log(err));
  };
  const getMovies = () => {
    axios
      .get("http://127.0.0.1:8000/api/movies")
      .then((response) => setMovies(response.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="row">
      <NewMovie genres={genres} onReload={() => getMovies()} />
      <MoviesList
        movies={movies}
        genres={genres}
        onReload={() => getMovies()}
      />
    </div>
  );
}

export default Movies;
