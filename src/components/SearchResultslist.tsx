import React from "react";
import "./SearchResultlist.css";
type Props = {
  searchQuery: string;
  onClickText: (onClickVal: string) => void;
};

const SearchResultslist = ({ searchQuery, onClickText }: Props) => {
  const resultsListString = localStorage.getItem("data" || "");

  if (resultsListString !== null) {
    var resultsListArray = JSON.parse(resultsListString);
  } else {
    var resultsListArray = JSON.parse('["unique"]');
  }

  console.log(resultsListString);
  return (
    <div className="results-list">
      {resultsListArray
        .filter((data: string) => {
          const searchQueryLowerCase = searchQuery.toLowerCase();
          return searchQueryLowerCase && data.startsWith(searchQueryLowerCase);
        })
        .map((data: string) => {
          return (
            <small className="each-query" onClick={() => onClickText(data)}>
              {data}
            </small>
          );
        })}
    </div>
  );
};

export default SearchResultslist;
