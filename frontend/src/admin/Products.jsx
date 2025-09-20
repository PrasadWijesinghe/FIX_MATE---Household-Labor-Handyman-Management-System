import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/supplier/admin/all');
      if (data.success) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error(err.response.data.message || 'Session expired. Please log in again.');
        navigate('/adminlogin');
      } else {
        setProducts([]);
        toast.error('Failed to fetch products.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
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
                await axios.delete(`/api/supplier/admin/${productId}`);
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

  // Group products by supplier
  const productsBySupplier = products.reduce((acc, product) => {
    const supplierName = product.supplier?.name || 'Unknown Supplier';
    if (!acc[supplierName]) acc[supplierName] = [];
    acc[supplierName].push(product);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Products Management</h2>
      {loading ? (
        <div className="text-gray-300">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-gray-400">No products found.</div>
      ) : (
        <div className="space-y-10">
          {Object.entries(productsBySupplier).map(([supplier, prods]) => (
            <div key={supplier}>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Supplier: {supplier}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg mb-6">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Product Name</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prods.map(product => (
                      <tr key={product._id} className="border-b border-gray-700">
                        <td className="px-4 py-2">{product.name}</td>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
