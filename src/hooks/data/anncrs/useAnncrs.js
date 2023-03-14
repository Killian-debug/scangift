import client from "../../Axios";
import { useState, useEffect } from "react";


export const useAnncrs = ({codeAnncrs = null }) => {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async () =>  {
      await client
        .get(`/annonceur/${codeAnncrs}`)
        .then((res) => {
          const data = res.data.data;

          console.log("anncrs :" + JSON.stringify(data));
          setResponse(JSON.parse(JSON.stringify(data)))
        })
        .catch((err) => {
          console.error(err);
          
        });
      }
  }, []);
    return response
};


