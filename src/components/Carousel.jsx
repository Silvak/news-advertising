import React, { useState } from "react";

function Carousel({ data }) {
  const [count, setCount] = useState(0);

  console.log(data);

  return (
    <div className="card">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
}

export default Carousel;
