import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { fetchDataFromApi } from "../../api/api";
import "./searchBar.scss";
import { useAppSelector } from "../../components/comman/hook";
import MoviePagination from "../../components/searchresult/CardPagination";
import SearchResultData from "../../components/searchresult/SearchResultData";
import { searchResultType } from "../../types/explorepage/Explore";
import { movieList } from "../../types/redux/ActionModel";
import MovieCardView from "../../components/searchresult/MovieCardView";
import MoviePerson from "../../components/searchresult/MoviePerson";
import MovieKeyWord from "../../components/searchresult/MovieKeyWord";

function SearchResult() {
  const params = useParams();
  const [data, setData] = useState<any>();
  const [jsonData, setJsonData] = useState<searchResultType>();
  const paginationNumber = useAppSelector(
    (state) => state.home.paginationNumber
  );
  const resultValue = useAppSelector((state) => state.home.resultValue);

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
        fetchDataFromApi(
          `search/${resultValue}`,
          `${params.movie}`,
          paginationNumber
        ).then((res) => {
          const tempMovie = res.results.map((item: movieList) => ({
            ...item,
            img: url.backdrop + item.backdrop_path,
            profile_img: url.profile + item.profile_path,
            media: resultValue,
          }));
          setData(tempMovie);
          setJsonData(res);
        });
      });
  }, [paginationNumber, params.movie, resultValue]);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-4">
            <SearchResultData searchData={params} />
          </div>

          <div className="col-lg-8">
            {resultValue === "person" ? (
              <MoviePerson data={data} />
            ) : resultValue === "keyword" ? (
              <MovieKeyWord data={data} />
            ) : (
              <MovieCardView data={data} />
            )}
            {jsonData && jsonData.total_pages > 1 ?
            <MoviePagination number={jsonData ? jsonData.total_pages : 1} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResult;
