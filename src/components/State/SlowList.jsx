import { useState } from "react";

// Generate a large array of dummy data
const massiveList = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

function SlowList() {
  const [filterText, setFilterText] = useState("");
  const [count, setCount] = useState(0);

  const filteredItems = massiveList.filter((item) => {

    for (let i = 0; i < 100000; i++) {} 
    return item.name.toLowerCase().includes(filterText.toLowerCase());
  });

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

export default SlowList;