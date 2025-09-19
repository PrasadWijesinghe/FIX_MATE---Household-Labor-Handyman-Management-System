import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { backendUrl, setIsLoggedin, setUserData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const navigate = useNavigate();
  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(backendUrl + '/api/auth/logout', {}, { withCredentials: true });
      setIsLoggedin(false);
      setUserData(null);
      navigate('/');
    } catch {
      //  error
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/user/data', { withCredentials: true });
        if (data.success) setUser(data.userData);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [backendUrl]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id && !user?.id) return;
      setOrdersLoading(true);
      try {
        const userId = user._id || user.id;
        const { data } = await axios.get(`${backendUrl.replace(/\/api.*/, '')}/api/orders/user/${userId}`, { withCredentials: true });
        if (data.success) setOrders(data.orders);
        else setOrders([]);
      } catch {
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user, backendUrl]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col gap-4 min-h-full">
        <div className="mb-8">
          {user?.profileImageUrl ? (
            <img
              src={
                user.profileImageUrl.startsWith('http')
                  ? user.profileImageUrl
                  : backendUrl.replace(/\/api.*/, '') + user.profileImageUrl
              }
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-blue-600"
            />
          ) : (
            <div className="rounded-full bg-blue-600 w-16 h-16 flex items-center justify-center text-3xl text-white font-bold mx-auto mb-2">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
          )}
          <div className="text-center mt-2 font-semibold text-lg">{user?.name || 'User Name'}</div>
          <div className="text-center text-gray-500 text-sm">{user?.email || 'user@email.com'}</div>
        </div>
        <button
          className={`text-left px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          View Orders
        </button>
        <button
          className={`text-left px-4 py-2 rounded ${activeTab === 'previous' ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveTab('previous')}
        >
          Previous Orders
        </button>
        <div className="flex-1" />
        <button
          className={`text-left px-4 py-2 rounded ${activeTab === 'edit' ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-200'}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Profile
        </button>
        <button
          className="text-left px-4 py-2 rounded hover:bg-red-100 text-red-700 font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-10">
        {activeTab === 'edit' ? (
          <EditProfileForm user={user} setUser={setUser} setActiveTab={setActiveTab} backendUrl={backendUrl} />
        ) : activeTab === 'orders' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
            {ordersLoading ? (
              <div className="text-gray-400">Loading orders...</div>
            ) : (
              <>
                {orders.filter(o => o.status === 'pending' || o.status === 'ongoing').length === 0 ? (
                  <div className="text-gray-500">No orders to show.</div>
                ) : (
                  <div className="space-y-4">
                    {orders.filter(o => o.status === 'pending' || o.status === 'ongoing').map(order => (
                      <div key={order._id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-semibold">{order.vendorName}</div>
                          <div className="text-gray-600 text-sm">Date: {order.date}</div>
                          <div className="text-gray-600 text-sm">Status: <span className="capitalize font-medium">{order.status}</span></div>
                          {order.notes && <div className="text-gray-500 text-xs mt-1">Notes: {order.notes}</div>}
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          <div className="text-gray-700 text-sm">Address: {order.address}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : activeTab === 'previous' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Previous Orders</h2>
            {ordersLoading ? (
              <div className="text-gray-400">Loading orders...</div>
            ) : (
              <>
                {orders.filter(o => o.status === 'done' || o.status === 'rejected').length === 0 ? (
                  <div className="text-gray-500">No previous orders to show.</div>
                ) : (
                  <div className="space-y-4">
                    {orders.filter(o => o.status === 'done' || o.status === 'rejected').map(order => (
                      <div key={order._id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-semibold">{order.vendorName}</div>
                          <div className="text-gray-600 text-sm">Date: {order.date}</div>
                          <div className="text-gray-600 text-sm">Status: <span className="capitalize font-medium">{order.status}</span></div>
                          {order.notes && <div className="text-gray-500 text-xs mt-1">Notes: {order.notes}</div>}
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          <div className="text-gray-700 text-sm">Address: {order.address}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Edit Profile Form Component
function EditProfileForm({ user, setUser, setActiveTab, backendUrl }) {

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    birthday: user?.birthday || '',
    profileImageUrl: user?.profileImageUrl || '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(
    user?.profileImageUrl
      ? user.profileImageUrl.startsWith('http')
        ? user.profileImageUrl
        : backendUrl.replace(/\/api.*/, '') + user.profileImageUrl
      : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      birthday: user?.birthday || '',
      profileImageUrl: user?.profileImageUrl || '',
    });
    if (user?.profileImageUrl) {
      setProfileImagePreview(
        user.profileImageUrl.startsWith('http')
          ? user.profileImageUrl
          : backendUrl.replace(/\/api.*/, '') + user.profileImageUrl
      );
    } else {
      setProfileImagePreview(null);
    }
    setProfileImage(null);
  }, [user, backendUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('address', form.address);
      formData.append('birthday', form.birthday);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      // Email is not editable, so not sent
      const { data } = await axios.put(
        backendUrl + '/api/user/update-profile',
        formData,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );
      if (data.success) {
        setUser((prev) => ({ ...prev, ...data.user }));
        setActiveTab('orders');
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form className="max-w-2xl w-full bg-white rounded-lg shadow p-8" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          {profileImagePreview ? (
            <img src={profileImagePreview} alt="Profile" className="w-24 h-24 rounded-full object-cover mb-2" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-4xl text-blue-700 font-bold mb-2">
              {form.name ? form.name[0].toUpperCase() : 'U'}
            </div>
          )}
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded cursor-pointer text-xs mt-2">
            Change Photo
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
            required
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-semibold"
            onClick={() => setActiveTab('orders')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
