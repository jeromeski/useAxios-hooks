import useAxios from "../hooks/useAxios";
import axios from "../apis/dad-jokes";
import ClipLoader from "react-spinners/ClipLoader";

const Jokes = () => {
  const [joke, error, loading, newJoke] = useAxios({
    axiosInstance: axios,
    // appended to baseURL
    url: "/",
    method: "GET",
    requestConfig: {
      headers: {
        "Content-Language": "en-us"
      }
    }
  });
  return (
    <div>
      <h2>Dad Joke</h2>
      {loading && <ClipLoader />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && joke && <p>{joke?.joke}</p>}
      {!loading && !error && !joke && <p>No Dad Joke to display.</p>}
      <br />
      <button onClick={() => newJoke()}>New Joke</button>
    </div>
  );
};

export default Jokes;
