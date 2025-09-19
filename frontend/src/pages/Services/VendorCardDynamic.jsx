import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../../Context/AppContext';

const VendorCardDynamic = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userData, isLoggedin } = useContext(AppContext);

  useEffect(() => {
    const fetchVendor = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`/api/vendor/category/vendor/${id}`);
        if (data.success && data.vendor) {
          setVendor(data.vendor);
        } else {
          setError(data.message || 'Vendor not found');
        }
      } catch (err) {
        setError('Failed to fetch vendor');
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  const images = vendor && vendor.galleryImages && vendor.galleryImages.length > 0
    ? vendor.galleryImages
    : (vendor && vendor.profileImageUrl ? [vendor.profileImageUrl] : []);
  const [thumbnail, setThumbnail] = React.useState(images[0] || null);


  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: userData?.name || '',
    phone: userData?.phone || '',
    email: userData?.email || '',
    address: userData?.address || '',
    date: '',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  React.useEffect(() => {
    if (images.length > 0) setThumbnail(images[0]);
  }, [vendor]);

  const handleBookingChange = e => {
    setBookingForm({ ...bookingForm, [e.target.name]: e.target.value });
  };

  

  // Only set bookingForm fields from userData when opening the modal
  const handleOpenBooking = () => {
    if (isLoggedin && userData) {
      setBookingForm({
        name: userData.name || '',
        phone: userData.phone || '',
        email: userData.email || '',
        address: userData.address || '',
        date: '',
        notes: ''
      });
    } else {
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        date: '',
        notes: ''
      });
    }
    setShowBooking(true);
  };


  const handleBookingSubmit = async e => {
    e.preventDefault();
    if (!isLoggedin || !userData) {
      toast.error('You must be logged in to book.');
      setShowBooking(false);
      return;
    }
   
    const name = bookingForm.name || userData.name;
    const phone = bookingForm.phone || userData.phone;
    const email = bookingForm.email || userData.email;
    const address = bookingForm.address || userData.address;
    const date = bookingForm.date;
    // Debug log userData
    console.log('Booking userData:', userData);
    // Try all possible userId fields
    const userId = userData._id || userData.id || userData.userId;
    console.log('Booking debug:', {
      vendorId: vendor._id,
      vendorName: vendor.name,
      userId,
      name,
      phone,
      email,
      address,
      date
    });
    if (!vendor._id || !vendor.name || !userId || !name || !phone || !email || !address || !date) {
      if (!userId) {
        toast.error('User ID missing. Please log out and log in again.');
      } else {
        toast.error('Please fill all required fields.');
      }
      return;
    }
    toast.info(
      <div>
        <div className="mb-2">Are you sure you want to proceed with this booking?</div>
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
            onClick={async () => {
              toast.dismiss();
              try {
                await axios.post('/api/orders', {
                  vendorId: vendor._id,
                  vendorName: vendor.name,
                  userId: userData._id || userData.id,
                  name,
                  phone,
                  email,
                  address,
                  date,
                  notes: bookingForm.notes
                });
                setBookingSuccess(true);
                setTimeout(() => {
                  setShowBooking(false);
                  setBookingSuccess(false);
                  setBookingForm({
                    name: userData.name || '',
                    phone: userData.phone || '',
                    email: userData.email || '',
                    address: userData.address || '',
                    date: '',
                    notes: ''
                  });
                }, 1800);
                toast.success('Your order has been placed.');
              } catch (err) {
                toast.error('Failed to place order. Please try again.');
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!vendor) return null;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 flex flex-col sm:flex-row items-center gap-6">
              <img
                src={vendor.profileImageUrl || '/default-profile.png'}
                alt={vendor.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">{vendor.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{vendor.category}</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Hourly Rate: ${vendor.hourlyRate}</span>
                </div>
                
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                  <span className="ml-2 text-sm">4.0 (120 reviews)</span>
                </div>
              </div>
            </div>
          
            <div className="p-6 flex flex-col lg:flex-row gap-8">
             
              <div className="flex flex-row gap-6 w-full lg:w-2/3">
             
                <div className="flex flex-col gap-2 items-center">
                  {images.filter(Boolean).map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setThumbnail(image)}
                      className={`w-16 h-16 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        thumbnail === image ? 'border-indigo-500' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                
                <div className="flex-1 border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center min-w-[250px] min-h-[250px]">
                  {thumbnail ? (
                    <img src={thumbnail} alt="Selected" className="w-full h-80 object-cover" />
                  ) : null}
                </div>
              </div>
              
              <div className="lg:w-1/3 flex flex-col gap-6 justify-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Contact</h3>
                  <div className="space-y-1 text-gray-700">
                    <div><span className="font-medium">Phone:</span> {vendor.phone || 'N/A'}</div>
                    <div><span className="font-medium">Email:</span> {vendor.email || 'N/A'}</div>
                    <div><span className="font-medium">Address:</span> {vendor.address || 'N/A'}</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <div className="text-gray-700">{vendor.description || 'No description provided.'}</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button
                    className="w-full sm:flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-black cursor-pointer"
                    onClick={handleOpenBooking}
                  >
                    Book Now
                  </button>
                  <button className="w-full sm:flex-1 border-2 border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 cursor-pointer">
                    Call Now
                  </button>
                </div>
      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl font-bold"
              onClick={() => setShowBooking(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Book {vendor.name}</h2>
            {bookingSuccess ? (
              <div className="text-green-600 text-center text-lg font-semibold py-8">Booking submitted!<br/>We will contact you soon.</div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleBookingSubmit}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleBookingChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="phone" className="font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleBookingChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleBookingChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address" className="font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={bookingForm.address}
                    onChange={handleBookingChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Service Address"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="date" className="font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleBookingChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="notes" className="font-medium text-gray-700">Additional Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookingForm.notes}
                    onChange={handleBookingChange}
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-h-[60px]"
                    placeholder="Additional notes (optional)"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
                  disabled={!isLoggedin}
                >
                  {isLoggedin ? 'Submit Booking' : 'Login to Book'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
              </div>
            </div>
           
            <div className="bg-white border-t border-gray-200 px-8 py-6">
              <h3 className="text-xl font-bold mb-4">Reviews</h3>
              <div className="space-y-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Rusith Fernando</span>
                    <span className="text-yellow-400">★★★★☆</span>
                  </div>
                  <div className="text-gray-700 text-sm">Great service, very professional and on time!</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Janith Disssanayake</span>
                    <span className="text-yellow-400">★★★★★</span>
                  </div>
                  <div className="text-gray-700 text-sm">Highly recommend! i will book again.</div>
                </div>
            
              </div>
            
              <div className="bg-gray-50 p-6 rounded-lg max-w-xl mx-auto mt-8">
                <h4 className="text-lg font-semibold mb-2">Add a Review</h4>
                <form className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    name="reviewerName"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Your Rating:</span>
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-6 h-6 cursor-pointer text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <textarea
                    placeholder="Your review..."
                    className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 min-h-[80px]"
                    name="reviewText"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VendorCardDynamic;
