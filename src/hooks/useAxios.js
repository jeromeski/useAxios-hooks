import { useState, useEffect } from "react";

const useAxios = (configObj) => {
  const { axiosInstance, url, method, requestConfig = {} } = configObj;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [reload, setReload] = useState(0);

  //  effect should use async/await,
  // should only run when component mounts
  // avoid memory leak

  const newJoke = () => setReload((prev) => prev + 1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal
        });

        setResponse(res.data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // cleanup function
    return () => controller.abort();
  }, [reload]);

  return [
    // add dependencies here
    response,
    error,
    loading,
    newJoke
  ];
};

export default useAxios;
