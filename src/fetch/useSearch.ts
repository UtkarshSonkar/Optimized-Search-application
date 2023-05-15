import axios from "axios";
import { useEffect, useState } from "react";
import usePrevious from "./usePrevious";

const useSearch = (query: string, page: number) => {
  const [importantData, setImportantData] = useState<any>([{}]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>([]);
  const prevPage = usePrevious(page);

  const cache = (queryVal: string) => {
    !results.includes(queryVal) && results.push(queryVal);
    if (localStorage.getItem("data") !== null) {
      // setResults(results);
      localStorage.setItem("data", JSON.stringify(results));
    } else {
      localStorage.setItem("data", "[]");
    }
  };

  // gives samll objects on every query and page change
  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();

    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9364ec148218469c7e3a015f722f988d&tags=${query}&per_page=15&page=${page}&format=json&nojsoncallback=1`,
        {
          cancelToken: source.token,
        }
      )
      .then((response) => {
        if (prevPage !== page) {
          response.data.photos.photo !== undefined &&
            setImportantData((prev: any) => [
              ...prev,
              ...response.data.photos.photo,
            ]);
        } else {
          response.data.photos.photo !== undefined &&
            setImportantData((prev: any) => [
              ...response.data.photos.photo,
              ...prev,
            ]);
        }

        setLoading(false);
        cache(query);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setError(true);
      });

    return () => source.cancel();
  }, [query, page]);
  return { importantData, loading, error, results };
};

export default useSearch;
