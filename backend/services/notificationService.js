const nodemailer = require('nodemailer');
// const twilio = require('twilio');

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// // Twilio client
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// Send email
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

// Send SMS
// const sendSMS = async (to, message) => {
//   try {
//     const sms = await twilioClient.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//     });
//     console.log('SMS sent:', sms.sid);
//     return sms;
//   } catch (error) {
//     console.error('SMS error:', error);
//     throw error;
//   }
// };

// Send booking notification
const sendBookingNotification = async (booking, user, action) => {
  try {
    let subject, html, smsMessage;

    switch (action) {
      case 'created':
        subject = 'Booking Created Successfully';
        html = `
          <h2>Booking Confirmation</h2>
          <p>Your booking has been created successfully!</p>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
          <p><strong>Total Amount:</strong> ₹${booking.totalPrice}</p>
          <p>Please complete the payment to confirm your booking.</p>
        `;
        smsMessage = `Booking created! ID: ${booking._id}. Amount: Rs.${booking.totalPrice}. Complete payment to confirm.`;
        break;

      case 'confirmed':
        subject = 'Booking Confirmed';
        html = `
          <h2>Booking Confirmed!</h2>
          <p>Your payment has been received and booking is confirmed.</p>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
          <p><strong>Start Date:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> ${new Date(booking.endDate).toLocaleDateString()}</p>
        `;
        smsMessage = `Booking ${booking._id} confirmed! Dates: ${new Date(booking.startDate).toLocaleDateString()} to ${new Date(booking.endDate).toLocaleDateString()}`;
        break;

      case 'updated':
        subject = 'Booking Updated';
        html = `
          <h2>Booking Updated</h2>
          <p>Your booking has been updated successfully.</p>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
        `;
        smsMessage = `Booking ${booking._id} has been updated.`;
        break;

      case 'cancelled':
        subject = 'Booking Cancelled';
        html = `
          <h2>Booking Cancelled</h2>
          <p>Your booking has been cancelled.</p>
          <p><strong>Booking ID:</strong> ${booking._id}</p>
          <p>If you paid, refund will be processed within 5-7 business days.</p>
        `;
        smsMessage = `Booking ${booking._id} cancelled. Refund will be processed if applicable.`;
        break;

      default:
        return;
    }

    // Send email (if user email available)
    if (user && user.email) {
      await sendEmail(user.email, subject, html);
    }

    // Send SMS (if user phone available)
    // if (user && user.phone) {
    //   await sendSMS(user.phone, smsMessage);
    // }
  } catch (error) {
    console.error('Notification error:', error);
    // Don't throw error - notifications are non-critical
  }
};

module.exports = {
  sendEmail,
  // sendSMS,
  sendBookingNotification,
};