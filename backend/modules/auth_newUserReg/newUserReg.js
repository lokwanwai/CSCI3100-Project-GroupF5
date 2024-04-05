const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const User = require('../../models/user');
const RegistrationOTP = require('../../models/registrationOTP');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
// const { mail } = require('../../config/config');

// Check if email is already registered
async function checkEmail(email) {
    // Check if email is undefined
    // console.log(email);
    if (email === undefined) {
        // console.log("Email input is undefined.");
        return false;
    }
    
    // console.log(email);
    const user = await User.findOne({ userEmail:email });
    return user ? true : false;
}


// Generate and Store OTP
async function generateAndStoreOTP(email) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(new Date().getTime() + 15 * 60 * 1000); // OTP expires in 15 minutes
    await RegistrationOTP.findOneAndUpdate(
      { email },
      { email, otp, expiresAt },
      { upsert: true, new: true }
    );
    return otp;
  }


//   Function that send OTP via email based on the email address provided
async function sendOTP(email) {
    // console.log({ path: path.resolve(__dirname, '.env') });
    // Query the OTP from the database
    const otpRecord = await RegistrationOTP.findOne({ email:email  });
    if (!otpRecord) {
      throw new Error('OTP not found for the provided email');
    }
  
    // Extract the OTP from the query result
    const otp = otpRecord.otp;
  
    // SMTP configuration using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  console.log(process.env.MAIL_USER, process.env.MAIL_PASS, process.env.MAIL_HOST, process.env.MAIL_PORT);
    // Proceed to send the OTP via email
    await transporter.sendMail({
      from: process.env.MAIL_USER, // Sender address
      to: email, // List of recipients
      subject: 'Your OTP for Registration', // Subject line
      text: `Hello! Your OTP for registration is: ${otp}. It will expire in 15 minutes.`, // Plain text body
      html: `<p>Hello! Your OTP for registration is: <strong>${otp}</strong>. It will expire in 15 minutes.</p>`, // HTML body
    });
  }



// Verify OTP
async function verifyOTP(email, otp) {
  const record = await RegistrationOTP.findOne({ email, otp });
  if (!record) return false;
  if (new Date() > record.expiresAt) {
    await RegistrationOTP.deleteOne({ email });
    return false;
  }
  await RegistrationOTP.deleteOne({ email });
  return true;
}

// Add new user
async function addNewUser(otp, email, name, password) {
    // Verify OTP
    const isOtpValid = await verifyOTP(email, otp);
    if (!isOtpValid) {
      throw new Error('Invalid or expired OTP');
    }
  
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash(password, salt);
  
    // Insert into the MongoDB collection
    const newUser = new User({
      userEmail: email,
      userName: name,
      saltedPassword: saltedPassword,
      isAdmin: false // Assuming default isAdmin to false, adjust as necessary
    });
  
    await newUser.save();
  
    // Return the new user document or any relevant information
    return newUser;
  }

module.exports = { checkEmail, generateAndStoreOTP,sendOTP, addNewUser };
