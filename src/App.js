// Import necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const AudioGenerator = () => {
  // Initialize state variables
  const [csvData, setCsvData] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [queues, setQueues] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch available queues from the API on component load
  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const response = await axios.get('/api/queues');
        setQueues(response.data);
      } catch (error) {
        console.error('Error fetching queues:', error);
      }
    };

    fetchQueues();
  }, []);

  // Handle file selection and parsing
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          setCsvData(result.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  };

  // Generate and send audio messages based on the prompt and CSV data
  const generateAndSendAudio = async () => {
    if (!selectedQueue || !prompt || csvData.length === 0) {
      alert('Please fill out all fields and upload a valid CSV.');
      return;
    }

    setLoading(true);

    try {
      // Adjust the API endpoint and request payload as needed
      const response = await axios.post('/api/generate-audio', {
        queue: selectedQueue,
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
          Select Queue:
          <select
            value={selectedQueue}
            onChange={(e) => setSelectedQueue(e.target.value)}
          >
            <option value="">Choose a queue</option>
            {queues.map((queue) => (
              <option key={queue.id} value={queue.id}>
                {queue.name}
              </option>
            ))}
          </select>
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
      </form>
      {csvData.length > 0 && (
        <div>
          <h3>CSV Data Preview</h3>
          <table>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                  <td>
                    <button type="button" onClick={() => alert('Play Audio')}>
                      Play Audio
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AudioGenerator;
