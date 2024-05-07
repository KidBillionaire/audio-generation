// CsvUploader.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { ref, set } from 'firebase/database';
import { database } from '../firebase'; // Adjust path if needed

const CsvUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [message, setMessage] = useState('');

  // Handle file selection, CSV parsing, and saving to Firebase
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const parsedData = result.data;
          setCsvData(parsedData); // Store parsed data in the state

          // Upload parsed CSV data to Firebase Realtime Database
          const timestamp = Date.now();
          const csvRef = ref(database, `csv-uploads/${timestamp}`);
          set(csvRef, parsedData)
            .then(() => console.log('CSV data uploaded to Realtime Database successfully!'))
            .catch((error) => console.error('Error uploading CSV data:', error));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  };

  // Handle the submission of calls to the API
  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/make-calls', {
        csvData,
        message
      });
      alert(response.data.message);
    } catch (error) {
      alert(`Error making calls: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>Upload CSV and Make Calls</h2>
      <label>
        Upload CSV File:
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </label>
      <br />
      <label>
        Enter Call Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSubmit}>Make Calls</button>
    </div>
  );
};

export default CsvUploader;
