import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { ref, set } from 'firebase/database';
import { database } from './firebase'; // Adjust the path as needed

const AudioGenerator = () => {
  const [csvData, setCsvData] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const [dialingStatus, setDialingStatus] = useState({}); // Stores the status of each row being dialed

  const audioRef = useRef(null);

  // Handle file selection and parsing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const parsedData = result.data;
          setCsvData(parsedData);

          // Initialize dialing status
          const initialStatus = {};
          parsedData.forEach((row, index) => {
            initialStatus[index] = 'Pending'; // Initial status for each row
          });
          setDialingStatus(initialStatus);

          // Store parsed CSV data in the Realtime Database under the path `csv-uploads/{timestamp}`
          const timestamp = Date.now();
          const csvRef = ref(database, `csv-uploads/${timestamp}`);
          set(csvRef, parsedData)
            .then(() => console.log('CSV data uploaded to Realtime Database successfully!'))
            .catch((error) => console.error('Error uploading CSV data:', error));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  const generateAndSendAudio = async () => {
    if (!prompt || csvData.length === 0) {
      alert('Please fill out all fields and upload a valid CSV.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/generate-audio', {
        prompt,
        data: csvData,
      });

      console.log('Audio generated successfully:', response.data);
      alert('Audio generated and sent successfully!');
    } catch (error) {
      console.error('Error generating audio:', error);
      alert('Failed to generate and send audio.');
    }

    setLoading(false);
  };

  const previewAudio = async () => {
    if (!prompt || csvData.length === 0) {
      alert('Please fill out all fields and upload a valid CSV.');
      return;
    }

    setPreviewLoading(true);

    try {
      const response = await axios.post('/api/preview-audio', {
        prompt,
        data: csvData,
      });

      setPreviewUrl(response.data.previewUrl); // URL of the generated audio
    } catch (error) {
      console.error('Error previewing audio:', error);
      alert('Failed to generate preview.');
    }

    setPreviewLoading(false);
  };

  const playSampleAudio = () => {
    if (audioRef.current) {
      const sampleAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      audioRef.current.src = sampleAudioUrl;
      audioRef.current.play();
    }
  };

  const dialNumber = async (rowIndex, phoneNumber) => {
    try {
      // Mark as "Dialing"
      setDialingStatus((prevStatus) => ({
        ...prevStatus,
        [rowIndex]: 'Dialing',
      }));

      // Simulate dialing (replace this with your real call API)
      await axios.post('/api/dial', { number: phoneNumber });

      // Mark as "Completed"
      setDialingStatus((prevStatus) => ({
        ...prevStatus,
        [rowIndex]: 'Completed',
      }));
    } catch (error) {
      // Mark as "Failed"
      setDialingStatus((prevStatus) => ({
        ...prevStatus,
        [rowIndex]: 'Failed',
      }));
    }
  };

  return (
    <div>
      <h2>Generate and Send Audio Messages</h2>
      <form>
        <label>
          Upload CSV File:
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </label>
        <br />
        <label>
          Enter Prompt:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={generateAndSendAudio} disabled={loading}>
          {loading ? 'Generating...' : 'Generate and Send Audio'}
        </button>
        <button type="button" onClick={previewAudio} disabled={previewLoading}>
          {previewLoading ? 'Generating Preview...' : 'Generate Preview'}
        </button>
      </form>
      {previewUrl && (
        <div>
          <h3>Audio Preview</h3>
          <audio ref={audioRef} controls src={previewUrl} />
        </div>
      )}
      {csvData.length > 0 && (
        <div>
          <h3>CSV Data Preview</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Dialing Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                  <td>{dialingStatus[index]}</td>
                  <td>
                    {/* Adjust field names as required */}
                    <button
                      type="button"
                      onClick={() => dialNumber(index, row.phoneNumber || row.phone)}
                    >
                      Call Lead
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </div>
  );
};

export default AudioGenerator;
