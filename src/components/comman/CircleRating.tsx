import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "../../assets/sass/circleRating.scss";
 
interface ratingValue{
  rating:number,
}
const CircleRating:React.FC<ratingValue> = ({ rating }) => {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating ?? "NR"}
        maxValue={10}
        text={String(rating)}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;
