import React, { useState } from "react";
import { assets } from "../assets/assets";

const AddProducts = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send form data (including image) to backend
    alert(`Product Added:\nName: ${form.name}\nPrice: ${form.price}\nDescription: ${form.description}\nImage: ${form.image ? form.image.name : 'No image'}`);
    setForm({ name: "", price: "", description: "", image: null });
    setImagePreview(null);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 mt-6">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Product</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-400 mb-1">Product Name</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Price</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-white"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />

          <div>Upload Image
            <label htmlFor="image" className="cursor-pointer block w-20">
              {imagePreview ? (
                <img className="w-20 h-20 object-cover border-2 border-white rounded" src={imagePreview} alt="Preview" />
              ) : (
                <img className="w-20 border-white" src={assets.Upload_img} alt="Upload" />
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </label>
            {form.image && <div className="text-gray-400 text-xs mt-1">{form.image.name}</div>}
          </div>

        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
