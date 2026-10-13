
import { useEffect, useMemo, useState } from "react";
// import "./ProductDashboard.css";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h3>{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => alert(product.title)}>
        View Product
      </button>
    </article>
  );
}

function ProductList({ products }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductStatistics({ products }) {
  const totalPrice = useMemo(
    () => products.reduce((total, product) => total + product.price, 0),
    [products]
  );

  return (
    <section>
      <h2>Statistics</h2>
      <p>Total products: {products.length}</p>
      <p>Total inventory value: ${totalPrice.toFixed(2)}</p>
    </section>
  );
}

export default function ProductDashboard() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }, [products, search]);

  const expensiveProducts = useMemo(
    () => products.filter((product) => product.price > 100),
    [products]
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <main className="dashboard">
      <h1>Product Dashboard</h1>

      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products"
      />

      <h2>All Products</h2>
      <ProductList products={filteredProducts} />

      <h2>Expensive Products</h2>
      <ProductList products={expensiveProducts} />

      <ProductStatistics products={products} />
    </main>
  );
}