import React from "react";
import { movieList } from "../../types/redux/ActionModel";
import { Link } from "react-router-dom";

function MovieKeyWord({ data }: { data: movieList[] | null }) {
  console.log(data);
  return (
    <>
      {" "}
      {data &&
        data.map((item) => (
          <Link to={`/search/${item.name}`}>
            <p key={item.id} className="my-1 text-center">
              {item.name}
            </p>
          </Link>
        ))}
    </>
  );
}

export default MovieKeyWord;
