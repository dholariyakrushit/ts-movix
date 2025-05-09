import React, { useState } from "react";
import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { fetchDataFromApi } from "../../api/api";
import "../../assets/sass/latestTvShow.scss";
import {
  genres,
  latestTvShowData,
  production_countries,
} from "../../types/explorepage/Explore";
import noposter from "../../assets/image/noposter.png";
function LatestTv() {
  const [latest, setLatest] = useState<latestTvShowData>();

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
        fetchDataFromApi(`tv/latest`).then((res) => {
          const tempMovie = {
            ...res,
            img: url.backdrop + res.backdrop_path,
          };
          setLatest(tempMovie);
        });
      });
  }, []);
console.log(latest);

  return (
    <div className=" mt-1 ">
      {" "}
      <div className="latest">
        <div className="latest-body">
          <p>Latest Tv show</p>
        </div>
        {latest && (
          <>
            <div className="row flex-wrap">
              <div className="col-lg-4 col-md-5">
                <img
                  src={latest.backdrop_path ? latest.img : noposter}
                  alt="imgs"
                  className="img-fluid img-poster"
                />
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="">
                  <h2>
                    {latest.title ?? latest.original_name}{" "}
                    {`(${new Date(latest.first_air_date).getFullYear()})` !==
                    "NaN"
                      ? `(${new Date(latest.first_air_date).getFullYear()})`
                      : " "}
                  </h2>
                  <p>
                    {latest.first_air_date} {"  "}
                    {latest.genres.map((item: genres) => (
                      <span key={item.id}>, {item.name}</span>
                    ))}
                  </p>
                  <div className="circlerat">
                    <div className="circleRating">
                      <CircularProgressbar
                        value={latest.vote_average}
                        maxValue={10}
                        text={String(latest.vote_average)}
                        styles={buildStyles({
                          pathColor:
                            latest.vote_average < 5
                              ? "red"
                              : latest.vote_average < 8
                              ? "orange"
                              : "green",
                        })}
                      />
                    </div>
                    <p>Vote Average</p>
                  </div>
                  <div>
                    <h4>overview</h4>
                    <p>{latest.overview}</p>
                  </div>
                  <div>
                    <div>
                      countries :
                      {latest.production_countries.map(
                        (item: production_countries) => (
                          <p key={item.iso_3166_1} className="countries">
                            {" "}
                            {item.name} {`(${item.iso_3166_1})`}
                            {", "}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LatestTv;
