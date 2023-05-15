import { SetStateAction, useState, useEffect } from "react";
import "./components/searchBar.css";
import Card from "./components/Card";
import "./components/searchBar.css";
import "./components/Card.css";
import useSearch from "./fetch/useSearch";
import SearchBlock from "./components/searchBlock";
import SearchResultslist from "./components/SearchResultslist";
import axios from "axios";

function App() {
  const [search, setSearch] = useState(``);
  const [pageNumber, setPageNumber] = useState(1);
  const [defaultData, setDefaultData] = useState<any>([{}]);
  const { importantData, loading, error } = useSearch(search, pageNumber);

  //**********************************default data from API ********************************************/
  const forDefaultData = () => {
    axios
      .get(
        "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=9364ec148218469c7e3a015f722f988d&per_page=10&page=1&format=json&nojsoncallback=1"
      )
      .then((response) => {
        // console.log(response.data.photos);
        setDefaultData(response.data.photos.photo);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    forDefaultData();
  }, []);
  console.log(defaultData);

  //**********************handle scrolling on page change****************************
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  //************************************Search Bar for QUERY SUGGESTIONS and INPUT text******************************************** */
  const onChangeText = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const onClickText = (onClickVal: string) => {
    setSearch(onClickVal);
  };

  return (
    <div className="App">
      <div>
        <div className="search-bar">
          <SearchBlock search={search} onChangeText={onChangeText} />
          <SearchResultslist searchQuery={search} onClickText={onClickText} />
        </div>
        <div className="my-details">
          Portfolio:https://portfolio-utkarsh-sonkar.netlify.app/
        </div>
        <div className="picture-view">
          {search === "" ? (
            <div className="card-wrapper">
              {defaultData.map((item: any) => {
                return <Card key={item.index} images={item} />;
              })}
              <small>{`<search your feed></feed your search>`}</small>
            </div>
          ) : (
            <div className="card-wrapper">
              {importantData.map((item: any) => {
                return <Card key={item.index} images={item} />;
              })}

              <div>{loading && <h2>Loading...</h2>}</div>
              <div>{error && `Error`}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
