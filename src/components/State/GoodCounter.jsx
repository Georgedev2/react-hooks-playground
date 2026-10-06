import { useState } from "react";

function GoodCounter() {
  // GOOD: Using state for values that affect what the user sees
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1); // Updates the value AND triggers a re-render
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default GoodCounter;