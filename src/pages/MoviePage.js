import React, { useEffect, useState } from "react";
import { fetcher, iconSearch } from "../config";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
const itemsPerPage = 20;

const MoviePage = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=bebc39fba3eb0f14bf125212e3be78df&page=${page}`
  );
  const handlePageOnChange = (e) => {
    setFilter(e.target.value);
  };
  const filterDebounce = useDebounce(filter, 500);

  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=bebc39fba3eb0f14bf125212e3be78df&query=${filterDebounce}&page=${page}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=bebc39fba3eb0f14bf125212e3be78df&page=${page}`
      );
    }
  }, [filterDebounce, page]);

  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];

  const pageCount = Math.ceil(data?.total_results / itemsPerPage);
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className="py-10 page-1000px page-container">
      <div className="mb-5 text-white flex ">
        <div className="flex-1">
          <input
            onChange={handlePageOnChange}
            type="text"
            className="w-full outline-none p-4 bg-slate-800 rounded-lg"
          />
        </div>
        <button className="rounded-lg bg-pink-500 p-4">{iconSearch}</button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )}

      {movies?.length ? (
        <>
          <div className="grid grid-cols-4 gap-5 ">
            {movies.map((item) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={5}
            className="pagination"
          />
        </>
      ) : (
        <>
          {!loading && (
            <div className=" flex justify-center mx-auto w-full">
              <div className="w-10 h-10 rounded-full border-4 border-t-transparent border-t-4 animate-spin"></div>
              <h4 className="text-center text-3xl text-red-500 mx-2">
                Error value
              </h4>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MoviePage;
