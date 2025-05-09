import React, { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { fetchDataFromApi } from "../../api/api";
import { Link } from "react-router-dom";
import noposter from "../../assets/image/noposter.png";
import CircleRating from "../comman/CircleRating";
import "../../assets/sass/scrollBar.scss";
import { movieList } from "../../types/redux/ActionModel";

function AiringToday() {
  const [airingmovie, setAiringMovie] = useState<movieList[]>();

  useEffect(() => {
    fetchDataFromApi("configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        return url;
      })

      .then((url) => {
        fetchDataFromApi(`tv/airing_today`).then((res) => {
          const tempMovie = res.results.map((item: movieList) => ({
            ...item,
            img: url.backdrop + item.backdrop_path,
          }));
          setAiringMovie(tempMovie);
        });
      });
  }, []);
  return (
    <div className="container mt-5 ">
      {" "}
      <div className="cards">
        <div className="header">
          <p>Airing Today</p>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={3}
          freeMode={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 7,
            },
          }}
        >
          {airingmovie &&
            airingmovie.map((item) => (
              <SwiperSlide>
                {" "}
                <Link to={`/explore/tv/${item.id}`}>
                  <div className="card">
                    <img
                      className="card-img"
                      src={item.backdrop_path ? item.img : noposter}
                      alt="aimg"
                    />
                    <CircleRating
                      rating={Number(item?.vote_average?.toFixed(1))}
                    />
                  </div>
                </Link>
                <p className="title">{item.original_title ?? item.name}</p>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default AiringToday;
