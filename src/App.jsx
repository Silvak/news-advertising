import "./styles.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  getReutersData,
  getCnnData,
  getPaisData,
} from "./services/graphql.services";

const Carousel = lazy(() => import("./components/Carousel"));
const Frame = lazy(() => import("./components/Frame"));

// Works also with SSR as expected
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPaisData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mainContainer">
      <div className="adsConatiner">
        <Suspense fallback={<p>Loading...</p>}>
          {data && <Carousel data={data} />}
        </Suspense>
      </div>

      <div className="iframeContainer">
        <Suspense fallback={<p>Loading...</p>}>{/* <Frame /> */}</Suspense>
      </div>
    </div>
  );
}

export default App;
