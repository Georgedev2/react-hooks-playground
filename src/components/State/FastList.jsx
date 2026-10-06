import { useState, useMemo } from "react";

const massiveList = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

function FastList() {
  const [filterText, setFilterText] = useState("");
  const [count, setCount] = useState(0);

  // GOOD: Memoized calculation. Only runs when `filterText` changes.
  const filteredItems = useMemo(() => {
    console.log("Running expensive calculation...");
    return massiveList.filter((item) => {
      // Simulated heavy calculation
      for (let i = 0; i < 100000; i++) {}
      return item.name.toLowerCase().includes(filterText.toLowerCase());
    });
  }, [filterText]); // Dependency array ensures it only recalculates when filterText changes

  return (
    <div>
      <input
        type="text"
        placeholder="Type to filter..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>Re-render: {count}</button>
      <p>Showing {filteredItems.length} items</p>
    </div>
  );
}
export default FastList;