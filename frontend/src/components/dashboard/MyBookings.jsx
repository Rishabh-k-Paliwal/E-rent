import React, { useState } from 'react';
import { bookingAPI } from '../../services/api';
import './Dashboard.css';

const MyBookings = ({ bookings, onUpdate }) => {
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = (booking) => {
    setEditingBooking(booking._id);
    setFormData({
      startDate: booking.startDate.split('T')[0],
      endDate: booking.endDate.split('T')[0],
    });
  };

  const handleUpdate = async (bookingId) => {
    if (!formData.startDate || !formData.endDate) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await bookingAPI.update(bookingId, formData);
      alert('Booking updated successfully');
      setEditingBooking(null);
      onUpdate();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update booking');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setLoading(true);
    try {
      await bookingAPI.cancel(bookingId);
      alert('Booking cancelled successfully');
      onUpdate();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="no-data">
        <h3>No bookings yet</h3>
        <p>Start browsing products to make your first booking!</p>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-header">
              <h3>{booking.product?.name}</h3>
              <span className={`status-badge status-${booking.status}`}>
                {booking.status}
              </span>
            </div>

            {editingBooking === booking._id ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    min={formData.startDate}
                  />
                </div>
                <div className="form-actions">
                  <button
                    onClick={() => handleUpdate(booking._id)}
                    className="btn-save"
                    disabled={loading}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingBooking(null)}
                    className="btn-cancel-edit"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">Start Date:</span>
                    <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">End Date:</span>
                    <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Total Price:</span>
                    <span className="price">₹{booking.totalPrice}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Delivery Address:</span>
                    <span>{booking.location?.address}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Payment Status:</span>
                    <span className={`payment-status ${booking.paymentStatus}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="booking-actions">
                    <button
                      onClick={() => handleEdit(booking)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn-cancel-booking"
                      disabled={loading}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;