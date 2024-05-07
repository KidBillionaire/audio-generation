const Vonage = require('@vonage/server-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Ensure correct file path to the private key

// Initialize Express server
const app = express();
const port = 3001;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Vonage credentials
const vonage = new Vonage({
  apiKey: 'f2605e6a', // Replace with your API Key
  apiSecret: '48aUGb6GxuJfhkV3', // Provide the correct API Secret
  applicationId: '5e511d7e-5c43-46a8-8e0e-34342fbd2342', // Replace with your Application ID
  privateKey: path.join(__dirname, 'private.key') // Ensure the private key file path is correct
});

// Dummy data for queues and analytics
const queues = [{ id: 1, name: 'Sales' }, { id: 2, name: 'Support' }];
let analyticsData = {
  interested: 5,
  notInterested: 3,
  noResponse: 2
};

// Queues endpoint
app.get('/api/queues', (req, res) => {
  res.json(queues);
});

// Analytics endpoint
app.get('/api/call-analytics', (req, res) => {
  res.json(analyticsData);
});

// Make call via Vonage Voice API
app.post('/make-call', (req, res) => {
  const { toNumber } = req.body;

  // Nexmo Call Control Object (NCCO) for the call's actions
  const ncco = [
    {
      action: 'talk',
      text: 'This is a text-to-speech call from Vonage'
    }
  ];

  vonage.calls.create({
    to: [{ type: 'phone', number: toNumber }],
    from: { type: 'phone', number: 'YOUR_VONAGE_PHONE_NUMBER' }, // Replace with your Vonage phone number
    ncco
  }, (error, response) => {
    if (error) {
      console.error('Error making call:', error);
      res.status(500).json({ message: 'Failed to make a call.' });
    } else {
      res.json({ message: `Call initiated with SID: ${response.uuid}` });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
// server.js or equivalent backend file
const express = require('express');
const Vonage = require('@vonage/server-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Vonage setup
const vonage = new Vonage({
  apiKey: 'f2605e6a',
  apiSecret: '48aUGb6GxuJfhkV3'
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Process CSV data and make calls
app.post('/api/make-calls', async (req, res) => {
  const { csvData, message } = req.body;

  if (!csvData || !Array.isArray(csvData) || csvData.length === 0) {
    return res.status(400).json({ error: 'Invalid CSV data' });
  }

  // Iterate over CSV data and make calls
  const promises = csvData.map((entry) => {
    const toNumber = entry.phoneNumber;

    return new Promise((resolve, reject) => {
      vonage.calls.create(
        {
          to: [{ type: 'phone', number: toNumber }],
          from: { type: 'phone', number: 'YOUR_VONAGE_NUMBER' }, // Set your Vonage number
          ncco: [{ action: 'talk', text: message }]
        },
        (error, response) => {
          if (error) reject(error);
          else resolve(response);
        }
      );
    });
  });

  // Handle the results of all calls
  try {
    await Promise.all(promises);
    res.json({ message: 'Calls placed successfully' });
  } catch (error) {
    res.status(500).json({ error: `Error placing calls: ${error.message}` });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend API listening on port ${port}`);
});
