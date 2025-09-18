import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
  const { data } = await axios.get('/api/product/admin/all');
      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRemove = (productId) => {
    toast.info(
      <div>
        <div className="mb-2">Are you sure you want to remove this product?</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            onClick={async () => {
              toast.dismiss();
              try {
                await axios.delete(`/api/product/admin/${productId}`);
                toast.success('Product removed.');
                fetchProducts();
              } catch {
                toast.error('Failed to remove product.');
              }
            }}
          >
            Yes
          </button>
          <button
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-xs"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, closeButton: false, position: 'top-center' }
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Products Management</h2>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-gray-400">No products found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Supplier Name</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.supplier?.name || 'Unknown'}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                      onClick={() => handleRemove(product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
