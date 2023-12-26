import React from "react";
import { BsDot } from "react-icons/bs";

import avatar from "../../assets/image/avatar.png";
import { movixPersonData } from "../../types/explorepage/Explore";
import { Link } from "react-router-dom";

interface MoviePersonProps {
  data: movixPersonData[] | null;
}
const MoviePerson: React.FC<MoviePersonProps> = ({ data }) => {
  console.log(data);

  return (
    <div className="person ">
      {data?.map((item) => (
        <div className="person-body" key={item.id}>
          <Link to={`/person/${item.id}`}>
          <div className="row text-white">
            <div className="col-lg-2 col-sm-2">
              <img
                alt="person"
                // variant="top"
                src={
                  item.backdrop_path
                    ? item.img
                    : item.profile_path
                    ? item.profile_img
                    : avatar
                }
                className="profile_img  "
              />
            </div>
            <div className="col-lg-10 col-sm-10">
              <h6>{item.original_name ?? item.original_title ?? item.name}</h6>{" "}
              Acting <BsDot />
              <p className=" acting">
                {item.known_for &&
                  item.known_for.map((data) => (
                    <span key={data.id}>
                      {data.title ?? data.name}
                      {", "}
                    </span>
                  ))}
              </p>
            </div>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoviePerson;
