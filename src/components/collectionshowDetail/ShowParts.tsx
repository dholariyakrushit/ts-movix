// import React from 'react'
// import { Link } from 'react-router-dom';
// import Card from "react-bootstrap/Card";

// import {  searchMovixCardData } from '../../types/explorepage/Explore'
// import noposter from '../../assets/image/noposter.png'
// interface showPartsData{
//     data

const ShowParts= () => {
  return (
    <>
      {/* {data &&
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
        ))} */}
    </>
  );
};

export default ShowParts