import { useState, useEffect } from "react";

const useAxiosFunction = () => {
  // const { axiosInstance, url, method, requestConfig = {} } = configObj;
  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  //  effect should use async/await,
  // should only run when component mounts
  // avoid memory leak
  const axiosFetch = async (configObj) => {
    const { axiosInstance, url, method, requestConfig = {} } = configObj;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal
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

  useEffect(() => {
    return () => {
      if (controller && controller.abort) {
        return controller.abort();
      }
    };
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
