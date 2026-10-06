import { useRef } from "react";

function BadCounter() {
  // BAD: Trying to store UI state in a ref
  const countRef = useRef(0); 

  function increment() {
    countRef.current += 1;
    console.log("Count is now:", countRef.current); // The console updates, but the screen doesn't!
  }

  return (
    <div>
      {/* React has no idea the ref changed, so it never re-renders to show the new number */}
      <p>Count: {countRef.current}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
export default BadCounter;

// {
//   current
// }