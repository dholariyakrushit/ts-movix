import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import { fetchDataFromApi } from "../../api/api";
import noposter from "../../assets/image/noposter.png";
import CircleRating from "../comman/CircleRating";
import { movieList } from "../../types/redux/ActionModel";

interface paramsData {
  type: string | undefined;
  id: string | undefined;
}
function SimilarContant({ type, id }: paramsData) {
  const [similar, setSimilar] = useState<movieList[] | undefined>();

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
        fetchDataFromApi(`${type}/${id}/similar`).then((res) => {
          const tempMovie = res.results.map((item: movieList) => ({
            ...item,
            img: url.backdrop + item.backdrop_path,
          }));

          setSimilar(tempMovie);
        });
      });
  }, [id, type]);
  console.log(similar);

  return (
    <div className="container my-5 ">
      {" "}
      <div className="cards">
        <div className="header">
          <p>Similar Movies</p>
        </div>
        {similar?.[0] ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={3}
            freeMode={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              425: {
                slidesPerView: 3,
              },
              566: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 7,
              },

              1200: {
                slidesPerView: 8,
              },
            }}
          >
            {similar.map((item) => (
              <SwiperSlide key={item?.id}>
                {" "}
                <Link to={`/explore/movie/${item.id}`}>
                  <div className="card">
                    <img
                      src={item.backdrop_path ? item.img : noposter}
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
        ) : (
          <h2 className="text-center">No Similar Tv Show</h2>
        )}
      </div>
    </div>
  );
}

export default SimilarContant;
