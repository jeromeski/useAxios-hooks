import { useEffect, useCallback } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";
import axios from "../apis/todos";
import ClipLoader from "react-spinners/ClipLoader";

const Todos = () => {
  const [response, error, loading, axiosFetch] = useAxiosFunction();

  const fetchTodos = () => {
    axiosFetch({
      axiosInstance: axios,
      // appended to baseURL
      url: "/todos",
      method: "GET",
      requestConfig: {
        headers: {
          "Content-Language": "en-us"
        }
      }
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todos</h2>
      {loading && <ClipLoader />}
      {!loading && error && <p>{error}</p>}
      <ul>
        {!loading &&
          !error &&
          response &&
          response.map((todo, idx) => {
            if (idx < 10) {
              return <li key={idx}>{todo.title}</li>;
            }
          })}
      </ul>
      {!loading && !error && !response && <p>No Todos to display.</p>}
      <br />
    </div>
  );
};

export default Todos;
