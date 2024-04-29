import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  getReutersData,
  getCnnData,
  getPaisData,
} from "@/services/graphql.services";
import { Button } from "@/components/ui/button";

const CarouselAds = lazy(() => import("./components/CarouselAds"));
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
    <div className="bg-[#2c2c2c] w-full h-[100vh]">
      <div className="adsConatiner">
        <Suspense fallback={<p>Loading...</p>}>
          {data && <CarouselAds data={data} />}
        </Suspense>
      </div>
      <div className="iframeContainer">
        <Suspense fallback={<p>Loading...</p>}>{/* <Frame /> */}</Suspense>
      </div>
    </div>
  );
}

export default App;
