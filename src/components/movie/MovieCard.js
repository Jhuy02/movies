import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-3 rounded-lg bg-slate-800 h-full select-none text-white">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="object-cover rounded-lg w-full h-[200px] mb-5"
      />
      <div className="flex flex-1 flex-col">
        <h3 className="mb-3 text-base font-bold">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${id}`)}
          className="bg-pink-500 py-3 px-6 rounded-lg w-full mt-auto"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
