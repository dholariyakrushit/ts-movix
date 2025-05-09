import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { fetchDataFromApi } from "../../api/api";
import { exploreData } from "../../types/explorepage/Explore";
import SimilarContant from "../../components/explorePage/SimilareContant";
import './explorePage.scss'
function ExplorePage() {
  const [detail, setDetail] = useState<exploreData>();
  const [background, setBackground] = useState<string>();
  const params = useParams();

  useEffect(() => {
    fetchDataFromApi(`${params.type}/${params.id}`).then((res) => {
      setDetail(res);
    });
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
        fetchDataFromApi(`${params.type}/${params.id}`).then((res) => {
          const bg = url?.poster + res.poster_path;
          setBackground(bg);
        });
      });
  }, [setDetail, params.type, params.id]);
  console.log(detail);

  return (
    <>
      <div className="explore">
        {detail && (
          <>
            <div className="row flex-wrap g-0">
              <div className="col-lg-4 col-md-5">
                <img
                  src={background}
                  alt="imgs"
                  className="img-fluid img-poster"
                />
              </div>
              <div className="col-lg-8 col-md-7 p-3">
                <div className="explore-detail">
                  <h2>
                    {detail.title ?? detail.original_name ?? detail.name}
                    {detail.release_date
                      ? ` (${new Date(detail?.release_date)?.getFullYear()})`
                      : ""}
                  </h2>
                  <p>
                    {detail.release_date} {"  "}
                    {detail.genres.map((item) => (
                      <span key={item.id}>
                        , {item.name !== "undefined" ? item.name : null}
                      </span>
                    ))}
                  </p>
                  {detail.vote_count ? (
                    <div className="circlerat">
                      <div className="circleRating">
                        <CircularProgressbar
                          value={detail.vote_count}
                          maxValue={5000}
                          text={String(detail.vote_count)}
                          styles={buildStyles({
                            pathColor:
                              detail.vote_count < 500
                                ? "red"
                                : detail.vote_count < 1000
                                ? "orange"
                                : "green",
                          })}
                        />
                      </div>
                      <p>User Score</p>
                    </div>
                  ) : null}
                  <div>
                    <h4>overview</h4>
                    <p>{detail.overview}</p>
                  </div>
                  <div>
                    <div>
                      countries :
                      {detail?.production_countries?.map((item) => (
                        <p key={item?.iso_3166_1} className="countries">
                          {" "}
                          {item.name ?? null} {`(${item.iso_3166_1 ?? null})`}
                          {", "}
                        </p>
                      ))}
                    </div>
                    <p>
                      production companies:{" "}
                      {detail?.production_companies?.[0]?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <SimilarContant type={params.type} id={params.id} />
    </>
  );
}

export default ExplorePage;
