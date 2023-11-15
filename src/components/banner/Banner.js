import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { fetcher } from "../../config";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=bebc39fba3eb0f14bf125212e3be78df`,
    fetcher
  );
  const banner = data?.results || [];
  return (
    <div className="banner h-[400px] page-container mb-10 ">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {banner.length &&
          banner.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

function BannerItem({ item }) {
  const { title, poster_path } = item;
  return (
    <div className="w-full h-full relative rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg "
      />
      <div className="left-5 bottom-5 w-full text-white absolute">
        <h2 className="text-3xl font-bold mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
        </div>
        <button className="bg-pink-600 rounded-md py-3 px-6 font-medium">
          Watch now
        </button>
      </div>
    </div>
  );
}
export default Banner;
