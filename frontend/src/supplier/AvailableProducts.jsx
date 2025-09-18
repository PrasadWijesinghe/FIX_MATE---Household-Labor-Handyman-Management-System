import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SupplierContext } from "../Context/SupplierContext";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";

const AvailableProducts = () => {
  const { backendUrl } = useContext(SupplierContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(backendUrl + "/api/supplier/products", { withCredentials: true });
        if (data.success) {
          setProducts(data.products);
        }
      } catch {
        // error
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [backendUrl]);

  const handleDelete = (productId) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center">
          <div className="font-semibold mb-2">Are you sure you want to delete this product?</div>
          <div className="flex gap-3">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={async () => {
                try {
                  const { data } = await axios.delete(backendUrl + `/api/supplier/products/${productId}`, { withCredentials: true });
                  if (data.success) {
                    setProducts((prev) => prev.filter((p) => p._id !== productId));
                    toast.success("Product deleted");
                  } else {
                    toast.error(data.message || "Failed to delete product");
                  }
                } catch (error) {
                  toast.error(error.response?.data?.message || "Failed to delete product");
                }
                closeToast();
              }}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-xs font-semibold"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 mt-6">
      <h2 className="text-2xl font-bold text-white mb-6">Your Products</h2>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-gray-400">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-gray-700 rounded-xl p-4 flex flex-col items-center relative">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded mb-2 border-2 border-white" />
              )}
              <div className="text-xl font-semibold text-white mb-1">{product.name}</div>
              <div className="text-blue-400 font-bold mb-1">${product.price}</div>
              <div className="text-gray-300 text-sm mb-2">{product.description}</div>
              <div className="text-gray-500 text-xs mb-2">Added: {new Date(product.createdAt).toLocaleString()}</div>
              <button
                onClick={() => handleDelete(product._id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold shadow"
                title="Delete product"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableProducts;
