import { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, []);

  
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

export default Counter;
// 1, 2,3,4....
// What will console.log(count) print when the button is clicked?