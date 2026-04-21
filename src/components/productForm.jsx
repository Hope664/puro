import { useState } from "react";
import axios from "axios";

function ProductForm({ fetchProducts }){
    const [FormData, setForm] = useState({
        name:"",
        price:"",
        stock:""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", FormData);
            setForm({ name: "", price: "", stock: "" });
            fetchProducts();
        } catch (error) {
            alert("Failed to add product: " + error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <input 
                type="text"
                placeholder="Product name"
                value={FormData.name}
                onChange={(e) => setForm({...FormData, name: e.target.value})}
            />
            <input 
                type="number"
                placeholder="Price"
                value={FormData.price}
                onChange={(e) => setForm({...FormData, price: e.target.value})}
            />
            <input 
                type="number"
                placeholder="Stock"
                value={FormData.stock}
                onChange={(e) => setForm({...FormData, stock: e.target.value})}
            />
            <button type="submit">Add Product</button>
        </form>
    );
}

export default ProductForm;
