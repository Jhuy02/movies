import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movi-layout page-container text-white mb-10">
        <h2 className="text-white capitalize mb-5 text-2xl font-bold">
          Now Playing
        </h2>
        <MovieList api={"now_playing"}></MovieList>
      </section>
      <section className="movi-layout page-container text-white mb-10">
        <h2 className="text-white capitalize mb-5 text-2xl font-bold">Top</h2>
        <MovieList api={"top_rated"}></MovieList>
      </section>
      <section className="movi-layout page-container text-white mb-10">
        <h2 className="text-white capitalize mb-5 text-2xl font-bold">
          Trending
        </h2>
        <MovieList api={"popular"}></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
