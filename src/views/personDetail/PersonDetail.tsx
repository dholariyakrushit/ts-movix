import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-circular-progressbar/dist/styles.css";

import { fetchDataFromApi } from "../../api/api";
import { personDetailType } from "../../types/explorepage/Explore";
import "./personDetail.scss";
import MovieCredits from "../../components/personDetail/MovieCredits";
import TvCredits from "../../components/personDetail/TvCredits";

function PersonDetail() {
  const [detail, setDetail] = useState<personDetailType>();
  const [background, setBackground] = useState<string>();
  const params = useParams();
  useEffect(() => {
    fetchDataFromApi(`/person/${params.id}`).then((res) => {
      setDetail(res);
    });
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
        fetchDataFromApi(`person/${params.id}`).then((res) => {
          const bg = url?.poster + res.profile_path;
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
                  <h2>{detail.name}</h2>
                  <p className="biography">{detail.biography}</p>
                  <div className="personal-info">
                    <h4>Personal Info</h4>
                    <ul>
                      <li>
                        {" "}
                        <p className="title">Known For : </p>
                        <p className="data">{detail.known_for_department}</p>
                      </li>
                      <li>
                        <p className="title">Gender : </p>
                        <p className="data">
                          {detail.gender === 1 ? "Female" : "Male"}
                        </p>
                      </li>
                      <li>
                        {" "}
                        <p className="title">Birthdate : </p>
                        <p className="data">{detail.birthday}</p>
                      </li>
                      {detail.deathday ? (
                        <li>
                          <p className="title">Day of Death : </p>
                          <p className="data">{detail.deathday}</p>
                        </li>
                      ) : null}
                      <li>
                        {" "}
                        <p className="title">Place of Birth : </p>
                        <p className="data">{detail.place_of_birth}</p>
                      </li>
                      <li>
                        {" "}
                        <p className="title">Also Known As : </p>
                        <p className="data">{detail.also_known_as}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <MovieCredits id={params.id ? params.id : ""} />
      <TvCredits id={params.id ? params.id : ""} />
    </>
  );
}

export default PersonDetail;
