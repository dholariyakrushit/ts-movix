import React, { useState } from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { fetchDataFromApi } from "../../api/api";
import { Link } from "react-router-dom";
import noposter from "../../assets/image/noposter.png";
import CircleRating from "../comman/CircleRating";
import { movieList } from "../../types/redux/ActionModel";

function TvCredits({ id }: { id: string }) {
  const [cast, setCast] = useState<movieList[] | undefined>([]);
  const [crew, setCrew] = useState<movieList[] | undefined>([]);
  const [radioValue, setRadioValue] = useState<HTMLInputElement | string>("1");
  interface radioButton {
    name: string;
    value: string;
  }
  const radios: radioButton[] = [
    { name: "cast", value: "1" },
    { name: "crew", value: "2" },
  ];
  useEffect(() => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        return url;
      })

      .then((url) => {
        fetchDataFromApi(`/person/${id}/tv_credits`).then((res) => {
          console.log(res);

          const cast = res.cast.map((item: movieList) => ({
            ...item,
            img: url.backdrop + item.backdrop_path,
          }));
          const crew = res.crew.map((item: movieList) => ({
            ...item,
            img: url.backdrop + item.backdrop_path,
          }));
          setCast(cast);
          setCrew(crew);
        });
      });
  }, [id]);
  return (
    <>
      <div>
        <div className="container my-5 ">
          <div className="cards">
            <div className="header">
              <p> Movie Credits</p>

              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx + 7}`}
                    type="radio"
                    variant={idx % 2 ? "outline-primary" : "outline-primary"}
                    name="radio2"
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
              {radios[Number(radioValue)]?.name
                ? cast &&
                  cast.map((item) => (
                    <SwiperSlide>
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
                  ))
                : crew &&
                  crew.map((item) => (
                    <SwiperSlide>
                      <Link to={`/explore/tv/${item.id}`}>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default TvCredits;
