import React, { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { fetchDataFromApi } from "../../api/api";
import { Link } from "react-router-dom";
import noposter from "../../assets/image/noposter.png";
import CircleRating from "../comman/CircleRating";
import { movieList } from "../../types/redux/ActionModel";
function UpComing() {
  const [upComing, setUpComing] = useState<movieList[] | undefined>();

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
        fetchDataFromApi(`movie/upcoming`).then((res) => {
          const tempMovie = res.results.map(
            (item: movieList): movieList => ({
              ...item,
              img: url.backdrop + item.backdrop_path,
            })
          );
          setUpComing(tempMovie);
        });
      });
  }, [setUpComing]);

  return (
    <div>
      <div className="container my-5 ">
        <div className="cards">
          <div className="header">
            <p> Top Rating</p>
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
            {upComing &&
              upComing.map((item) => (
                <SwiperSlide>
                  <Link to={`/explore/movie/${item.id}`}>
                    <div className="card">
                      <img
                        src={item.img ?? noposter}
                        alt="aimg"
                        className="card-img"
                      />
                      <CircleRating
                        rating={Number(item?.vote_average?.toFixed(1))}
                      />
                    </div>
                  </Link>
                  <p className="title">{item.title ?? item.name}</p>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default UpComing;
