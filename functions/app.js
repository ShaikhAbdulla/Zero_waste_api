// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // Middleware to parse JSON data
// app.use(bodyParser.json());

// // Dummy storage for contacts
// let contacts = [];

// // API endpoint to handle contact form submissions
// app.post('/api/contact', (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'Please provide name, email, and message.' });
//   }

//   const newContact = {
//     name,
//     email,
//     message,
//     timestamp: new Date()
//   };

//   contacts.push(newContact);

//   return res.status(201).json({ message: 'Contact form submitted successfully!', contact: newContact });
// });

// // API endpoint to retrieve all contacts
// app.get('/api/contacts', (req, res) => {
//   return res.json({ contacts });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());

// Dummy storage for contacts
let contacts = [];

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zerowastemgmt470@gmail.com',
    pass: 'ajjtozofyrotfspc',
  },
});

// API endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const newContact = {
    name,
    email,
    message,
    timestamp: new Date()
  };

  // Send email notification
  const mailOptions = {
    from: email,
    to: 'zerowastemgmt470@gmail.com', // Replace with the actual recipient's email
    subject: message,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  contacts.push(newContact);

  return res.status(201).json({ message: 'Contact form submitted successfully!', contact: newContact });
});

// API endpoint to retrieve all contacts
app.get('/api/contacts', (req, res) => {
  return res.json({ contacts });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
