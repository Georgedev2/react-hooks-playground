
import React, { useState, useEffect } from "react";

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [products]);

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  const expensiveProducts = products.filter((product) => {
    return product.price > 100;
  });

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCount(count + 1);
  };

  const totalPrice = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Dashboard</h1>

      <input
        value={search}
        onChange={handleSearch}
        placeholder="Search products"
      />

      <p>Search changes: {count}</p>

      {loading ? <p>Loading...</p> : null}

      <h2>All Products</h2>

      {filteredProducts.map((product, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h3>{product.title}</h3>
          <p>${product.price}</p>

          <button
            onClick={() => alert(product.title)}
          >
            View Product
          </button>
        </div>
      ))}

      <h2>Expensive Products</h2>

      {expensiveProducts.map((product, index) => (
        <p key={index}>
          {product.title} - ${product.price}
        </p>
      ))}

      <h2>Statistics</h2>
      <p>Total products: {products.length}</p>
      <p>Total inventory value: ${totalPrice.toFixed(2)}</p>
    </div>
  );
}


// . Incorrect useEffect dependency

// . Repeated calculations on every render

// 3. Everything is inside one component

// 4. Array indexes used as keys

// 5. Loading state can get stuck

// 6. Unnecessary state for search changes

// 7. Inline styling is repeated

// 8. Missing response validation and request cleanup