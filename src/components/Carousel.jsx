import React, { useState } from "react";

function Carousel({ data }) {
  const [count, setCount] = useState(0);

  //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", data);

  return (
    <div className="card">
      <div className="flex h-[80px]">
        {data.map((element, index) => (
          <div key={index} className="flex h-[80px]">
            <img src={element.image.url} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
