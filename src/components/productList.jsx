import { useState, useEffect } from "react";
import axios from "axios";

function ProductList(){
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (error) {
            alert("Failed to fetch products: " + error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            alert("Failed to delete product: " + error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map((product) => (
                    <div key={product.id} style={{border: "1px solid #ccc", padding: "10px", marginBottom: "10px"}}>
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Stock: {product.stock}</p>
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default ProductList;

