/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

import { fetchDataFromApi } from "../../api/api";
import noposter from "../../assets/image/noposter.png";
import { movieList } from "../../types/redux/ActionModel";
import CircleRating from "../comman/CircleRating";

interface movieDataarr {
  movieTitle: string;
  radioValue_1: string;
  radioValue_2: string;
  radioKey: string;
}
function Trending({
  
  movieTitle,
  radioValue_1,
  radioValue_2,
  radioKey,
}: movieDataarr) {
  const [radioValue, setRadioValue] = useState<HTMLInputElement | string>("1");
  const [trending, setTrending] = useState<movieList[] | undefined>();

  interface radioButton {
    name: string;
    value: string;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const radios: radioButton[] = [
    { name: radioValue_1, value: "1" },
    { name: radioValue_2, value: "2" },
  ];

  useEffect(() => {
    fetchDataFromApi("configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "w300",
          profile: res.images.secure_base_url + "original",
        };
        return url;
      })
      .then((url) => {
        if (movieTitle === "Trending") {
          fetchDataFromApi(
            `trending/all/${radios[Number(radioValue) - 1].name.toLowerCase()}`
          ).then((res) => {
            const tempMovie = res.results.map((item: movieList) => ({
              ...item,
              img: url.poster + item.poster_path,
            }));

            setTrending(tempMovie);
          });
        } else if (movieTitle === "Popular") {
          fetchDataFromApi(
            `${radios[Number(radioValue) - 1].name.toLowerCase()}/popular`
          ).then((res) => {
            const tempMovie = res.results.map((item: movieList) => ({
              ...item,
              img: url.poster + item.poster_path,
              media_type: radios[Number(radioValue) - 1].name.toLowerCase(),
            }));

            setTrending(tempMovie);
          });
        } else {
          fetchDataFromApi(
            `${radios[Number(radioValue) - 1].name.toLowerCase()}/top_rated`
          ).then((res) => {
            const tempMovie = res.results.map((item: movieList) => ({
              ...item,
              img: url.poster + item.poster_path,
              media_type: radios[Number(radioValue) - 1].name.toLowerCase(),
            }));

            setTrending(tempMovie);
          });
        }
      });
  }, [radioValue, movieTitle]);

  return (
    <div className="container mt-5 ">
      {" "}
      <div className="cards">
        <div className="header">
          <p>{movieTitle}</p>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={radioKey}
                id={`radio-${idx + radioKey}`}
                type="radio"
                variant={idx % 2 ? "outline-primary" : "outline-primary"}
                name={radioKey}
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
        <Swiper
          slidesPerView={2}
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
          {trending &&
            trending.map((item) => (
              <SwiperSlide key={item.id}>
                {" "}
                <Link to={`/explore/${item.media_type}/${item.id}`}>
                  <div className="card">
                    <img
                      src={item.img ?? noposter}
                      alt="poster"
                      className="card-img"
                    />
                    <CircleRating
                      rating={Number(item?.vote_average?.toFixed(1))}
                    />
                  </div>
                </Link>
                <p className="title">{item.original_title ?? item?.name}</p>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Trending;
