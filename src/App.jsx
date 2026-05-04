
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./components/productForm";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // ✅ FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      alert("Failed to fetch products: " + error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ ADD / UPDATE
  const saveProduct = async () => {
    if (!form.name || !form.price || !form.stock) {
      alert("All fields required");
      return;
    }

    try {
      if (editIndex !== null) {
        const id = products[editIndex].id;

        await axios.put(
          `http://localhost:5000/api/products/${id}`,
          form
        );

        setEditIndex(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          form
        );
      }

      fetchProducts();

      setForm({
        name: "",
        price: "",
        stock: "",
      });

    } catch (error) {
      console.error("Error saving product:", error.message);
      alert("Failed to save product: " + error.message);
    }
  };

  // ✅ DELETE
  const deleteProduct = async (index) => {
    const id = products[index].id;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert("Failed to delete product: " + error.message);
    }
  };

  // ✅ EDIT
  const editProduct = (index) => {
    setForm(products[index]);
    setEditIndex(index);
  };

  // return (
  //   <div style={{ padding: "20px" }}>
  //     <h1>Product App</h1>

  //     <input
  //       name="name"
  //       placeholder="Product name"
  //       value={form.name}
  //       onChange={handleChange}
  //     />

  //     <input
  //       type="number"
  //       name="price"
  //       placeholder="Price"
  //       value={form.price}
  //       onChange={handleChange}
  //     />

  //     <input
  //       type="number"
  //       name="stock"
  //       placeholder="Stock"
  //       value={form.stock}
  //       onChange={handleChange}
  //     />

  //     <br /><br />

  //     <button onClick={saveProduct}>
  //       {editIndex !== null ? "Update" : "Add"}
  //     </button>

  //     <hr />

  //     {products.length === 0 ? (
  //       <p>No products yet</p>
  //     ) : (
  //       products.map((p, index) => (
  //         <div key={p.id}>
  //           <h3>{p.name}</h3>
  //           <p>Price: {p.price}</p>
  //           <p>Stock: {p.stock}</p>

  //           <button onClick={() => editProduct(index)}>Edit</button>
  //           <button onClick={() => deleteProduct(index)}>Delete</button>
  //         </div>
  //       ))
  //     )}
  //   </div>
  // );
  return (
  <div style={{ padding: "20px" }}>
    <h1>Product App</h1>

    {/* ✅ USE YOUR NEW FORM */}
    <ProductForm fetchProducts={fetchProducts} />

    <hr />

    {products.length === 0 ? (
      <p>No products yet</p>
    ) : (
      products.map((p, index) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>Price: {p.price}</p>
          <p>Stock: {p.stock}</p>

          <button onClick={() => editProduct(index)}>Edit</button>
          <button onClick={() => deleteProduct(index)}>Delete</button>
        </div>
      ))
    )}
  </div>
);
}

export default App;