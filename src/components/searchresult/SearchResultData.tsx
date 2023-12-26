import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setResultValue } from "../../redux/homeSlice/HomeSlice";
import { fetchDataFromApi } from "../../api/api";

interface SearchResultDataProps {
  searchData: any;
}

interface ResultItem {
  name: string;
  value: number;
}

const SearchResultData: React.FC<SearchResultDataProps> = ({ searchData }) => {
  const [totalResult, setTotalResult] = useState<ResultItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const arr = ["collection", "keyword", "movie", "person", "tv"];
    const fetchData = async () => {
      const results = await Promise.all(
        arr.map(async (keyword) => {
          const res = await fetchDataFromApi(
            `search/${keyword}`,
            searchData.movie
          );
          return { name: keyword, value: res.total_results };
        })
      );
      setTotalResult(results);
    };
    fetchData();
  }, [searchData.movie]);

  const dispatch = useDispatch();

  const handleResultValue = (name: string, index: number) => {
    setActiveIndex(index);
    dispatch(setResultValue(name));
  };

  return (
    <div>
      <div className="searchresult">
        <div className="result-title">
          <h3>search result</h3>
        </div>
        <div className="resultdata">
          {totalResult.map((item, index) => (
            <div
              key={index}
              className={`resultvalue ${
                activeIndex === index ? "bg-primary" : ""
              }`}
              onClick={() => handleResultValue(item.name, index)}
            >
              <p>{item.name}</p> <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultData;
