const express = require('express');
const router = express.Router();
const User = require('../models/user');
const VerificationOTP = require('../models/verificationOTP');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate and Store OTP
async function generateAndStoreOTP(email) {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(new Date().getTime() + 15 * 60 * 1000); // OTP expires in 15 minutes
  await VerificationOTP.findOneAndUpdate(
    { email },
    { email, otp, expiresAt },
    { upsert: true, new: true }
  );
  return otp;
}

// Function that sends OTP via email based on the email address provided
async function sendOTP(email) {
  const otpRecord = await VerificationOTP.findOne({ email });
  if (!otpRecord) {
    throw new Error('OTP not found for the provided email');
  }

  const otp = otpRecord.otp;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Your OTP for Verification',
    text: `Hello! Your OTP for verification is: ${otp}. It will expire in 15 minutes.`,
    html: `<p>Hello! Your OTP for verification is: <strong>${otp}</strong>. It will expire in 15 minutes.</p>`,
  });
}

// Verify OTP
async function verifyOTP(email, otp) {
  const record = await VerificationOTP.findOne({ email, otp });
  // if (!record) return false;
  // if (new Date() > record.expiresAt) {
  //   await VerificationOTP.deleteOne({ email });
  //   return false;
  // }
  await VerificationOTP.deleteOne({ email });
  return true;
}

// "/getdetails"
// Method: GET
// Parameter: email (in the body)
// Function: Return the entire user
router.put('/getdetails', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ userEmail: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// "/generate-and-send-verify-otp"
// Method: PUT
// Parameters: email
// Function: Generate, store and send an email OTP for verification
router.put('/generate-and-send-verify-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = await generateAndStoreOTP(email);
    await sendOTP(email);
    res.json({ message: 'OTP generated and sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// "/changename"
// Method: PUT
// Parameters: OTP, email, newName
// Function: verify the OTP, discard the OTP and then change the userName of that user with the email
router.put('/changename', async (req, res) => {
  try {
    const { otp, email, newName } = req.body;
    if (!await verifyOTP(email, otp)) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    const user = await User.findOne({ userEmail: email });
    user.userName = newName;
    await user.save();
    res.json({ message: 'User name changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// "/changemail"
// Method: PUT
// Parameters: OTP, email, newMail
// Function: verify the OTP, discard the OTP and then change the userEmail of that user with the email
router.put('/changemail', async (req, res) => {
  try {
    const { otp, email, newMail } = req.body;
    if (!await verifyOTP(email, otp)) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    const user = await User.findOne({ userEmail: email });
    user.userEmail = newMail;
    await user.save();
    res.json({ message: 'User email changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// "/changepassword"
// Method: PUT
// Parameters: OTP, email, newPassword
// Function: verify the OTP, discard the OTP and then change the saltedPassword of that user with the email
router.put('/changepassword', async (req, res) => {
  try {
    const { otp, email, newPassword } = req.body;
    if (!await verifyOTP(email, otp)) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    const user = await User.findOne({ userEmail: email });
    user.saltedPassword = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'User password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;