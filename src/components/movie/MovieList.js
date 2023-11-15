import MovieCard from "./MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";

const MovieList = ({ api = "now_playing", tiled = "" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${api}${tiled}?api_key=bebc39fba3eb0f14bf125212e3be78df`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <div className="swiper-list">
      <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
        {movies.length &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
