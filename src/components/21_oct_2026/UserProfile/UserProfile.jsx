
import { useState } from "react";

function UserProfile({ name }) {
  console.log("UserProfile rendered");

  return <h2>Hello, {name}</h2>;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      <UserProfile name="George"  />
    </div>
  );
}