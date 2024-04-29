import React, { useState } from "react";

function Carousel({ data }) {
  const [count, setCount] = useState(0);

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", data);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      <div>
        {data.map((element, index) => (
          <div key={index}>
            <img src={element.image.url} />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
