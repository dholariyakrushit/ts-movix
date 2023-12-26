import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import { fetchDataFromApi } from "../../api/api";
import {
  collectionShowData,
  searchMovixCardData,
} from "../../types/explorepage/Explore";
import "./collectionShowDetail.scss";
import noposter from "../../assets/image/noposter.png";

function CollectionShowDetail() {
  const [detail, setDetail] = useState<collectionShowData>();
  const [background, setBackground] = useState<string>();
  const [data, setData] = useState<searchMovixCardData[]>([]);
  const params = useParams<{ type: string; id: string }>();
  console.log(params);

  useEffect(() => {
    fetchDataFromApi(`${params.type}/${params.id}`).then((res) => {
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
        fetchDataFromApi(`${params.type}/${params.id}`).then((res) => {
          const bg = url?.poster + res.poster_path;

          const tempMovie = res.parts.map((item: searchMovixCardData) => ({
            ...item,
            img: url.backdrop + item.backdrop_path,
          }));
          setData(tempMovie);
          setBackground(bg);
        });
      });
  }, [setDetail, params.type, params.id]);
  console.log(data);

  return (
    <>
      <div className="explore">
        {detail && (
          <>
            <div className="row flex-wrap">
              <div className="col-lg-4 col-md-5">
                <img
                  src={background}
                  alt="imgs"
                  className="img-fluid img-poster"
                />
              </div>
              <div className="col-lg-8 col-md-7">
                <div>
                  <h2>{detail.name}</h2>
                  <div>
                    <h4>overview</h4>
                    <p>{detail.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {/* <p className="fs-1 ">Parts</p> */}
      {data &&
        data.map((item) => (
          <Link
            to={`/${
              item.media === "collection" ? "collectionshow" : "explore"
            }/${item.media_type ?? item.media}/${item.id}`}
          >
            <Card className="searchbar my-4">
              {" "}
              <Card.Img
                variant="top"
                src={
                  item.backdrop_path
                    ? item.img
                    : item.profile_path
                    ? item.profile_img
                    : noposter
                }
                className="img-fluid"
              />
              <Card.Body>
                <Card.Title>
                  {item.original_name ?? item.original_title ?? item.name}
                </Card.Title>
                <Card.Text>
                  {item.first_air_date ?? item.release_date}
                </Card.Text>
                <Card.Text className="overview">{item.overview}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
    </>
  );
}

export default CollectionShowDetail;
