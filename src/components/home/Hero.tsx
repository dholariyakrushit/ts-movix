/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { fetchDataFromApi } from "../../api/api";
import {
  configurationType,
  exploreData,
  searchResultType,
} from "../../types/explorepage/Explore";

function Hero() {
  const [search, setSearch] = useState<undefined | string>();
  const [data, setData] = useState<exploreData[]>();
  const [background, setBackground] = useState<string | null>(null);
  const [clear, setClear] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlerSearch = (text: string): void => {
    if (text.length > 2) {
      setSearch(text);
      setClear(true);
    } else {
      setSearch(text);
      setClear(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi("/configuration")
      .then((res: configurationType) => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        };
        return url;
      })
      .then((url) => {
        fetchDataFromApi("/movie/popular").then(
          (res: searchResultType): void => {
            const bg =
              url?.backdrop +
              res?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
            setBackground(bg);
          }
        );
      });
  }, []);

  useEffect(() => {
    fetchDataFromApi("search/multi", search).then(
      (res: searchResultType): void => {
        setData(res.results);
      }
    );
  }, [search]);


  return (
    <div>
      <div className="heros">
        {background ? (
          <img
            src={background && background}
            className="img-fluid bg-img"
            alt="background"
          />
        ) : (
          <p>loading</p>
        )}
        <div className="heros-body">
          <h1>Welcome</h1>
          <p>Millions of movie,TV shows and popular to discover, Explore now</p>
          <div>
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`search/${search}`);
                }
              }}
              type="text"
              value={search}
              placeholder="search"
              onChange={(e) => handlerSearch(e.target.value)}
            />
            <Link to={`/search/${search}`}>
              <Button className="search-btn">search</Button>
            </Link>
            <ul className="autoSuggection">
              {clear &&
                data &&
                data.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => setSearch(item.title ?? item.name)}
                  >
                    {item.title ?? item.name}
                  </li>
                ))}
            </ul>
          </div>
          {/* <Autocomplete
            items={data}
            getItemValue={(item: exploreData) => item.title || item.name}
            renderItem={(item: exploreData, isHighlighted: boolean) => (
              <div
                key={item.id}
                style={{ background: isHighlighted ? "lightgray" : "white" }}
                onClick={() => setSearch(item.title || item.name)}
              >
                {item.title || item.name}
              </div>
            )}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handlerSearch(e.target.value)
            }
            onSelect={(value: string) => setSearch(value)}
            inputProps={{
              placeholder: "search",
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;
