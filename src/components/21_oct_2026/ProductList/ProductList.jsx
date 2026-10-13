
import { useState } from "react";

export default function ProductList() {
  const [count, setCount] = useState(0);

  const products = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    price: i + 1,
  }));

  const totalPrice = products.reduce((total, product) => {
    console.log("Calculating total...");
    return total + product.price;
  }, 0);

  return (
    <div>
      <h2>Total: {totalPrice}</h2>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}