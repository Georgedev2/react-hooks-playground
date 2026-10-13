
import { useMemo, useState } from "react";

const products = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  price: i + 1,
}));

export default function ProductList() {
  const [count, setCount] = useState(0);

  const totalPrice = useMemo(() => {
    return products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }, []);

  return (
    <div>
      <h2>Total: {totalPrice}</h2>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}