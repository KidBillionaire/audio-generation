// Import necessary modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express app and set up file storage with multer
const app = express();
const upload = multer({ dest: 'uploads/' }); // Files will be saved in the "uploads" folder

// Upload endpoint accepting a CSV file
app.post('/upload', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const uploadedFilePath = path.join(__dirname, 'uploads', req.file.filename);

  // Rename file to have a .csv extension
  const finalFilePath = `${uploadedFilePath}.csv`;
  fs.renameSync(uploadedFilePath, finalFilePath);

  res.json({ message: 'File uploaded successfully', filePath: finalFilePath });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
