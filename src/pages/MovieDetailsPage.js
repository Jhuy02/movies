import React from "react";
import { useParams } from "react-router-dom";
import { fetcher } from "../config";
import useSWR from "swr";
import MovieList from "../components/movie/MovieList";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=bebc39fba3eb0f14bf125212e3be78df`,
    fetcher
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="bg-no-repeat w-full h-full bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[600px] max-w-[500px] mx-auto -mt-[300px] relative">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
        />
      </div>
      <h1 className="text-center text-4xl p-10 font-bold text-white">
        {title}
      </h1>

      {genres.length && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              key={item.id}
              className="py-2 px-4 border-pink-500 border rounded"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center max-w-[600px] mx-auto mb-10">{overview}</p>
      <MovieCredits></MovieCredits>
      <MovieVideo></MovieVideo>
      <div className="mt-10">
        <h2 className="text-center text-3xl mb-2">Similar</h2>
        <MovieList api={movieId} tiled="/similar"></MovieList>
      </div>
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=bebc39fba3eb0f14bf125212e3be78df`,
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  return (
    <>
      <h2 className="text-center text-3xl mb-10 ">CATS</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast?.slice(0, 4).map((item) => (
          <div key={item.id} className="cast-items">
            <img
              className="w-full h-[350px] object-cover rounded-lg mb-2"
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
            />
            <h3 className="text-center text-xl">{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

function MovieVideo() {
  const { movieId } = useParams();
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=bebc39fba3eb0f14bf125212e3be78df`,
    fetcher
  );
  if (!data) return null;

  const { results } = data;
  return (
    <>
      <h2 className=" text-center text-3xl mb-5 mt-10">Trailer</h2>
      {results?.slice(0, 1).map((item) => (
        <div key={item.id} className="flex justify-center ">
          <iframe
            width="864"
            height="486"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            // className="w-full h-full object-fill"
          ></iframe>
        </div>
      ))}
    </>
  );
}

export default MovieDetailsPage;
