import React, { useState } from 'react';

const AutoCallFrontend = () => {
    const [csvData, setCsvData] = useState([]);
    const [dialInNumber, setDialInNumber] = useState('');
    const [queue, setQueue] = useState('');
    const [loading, setLoading] = useState(false);
    const [callStatus, setCallStatus] = useState('');

    // Handle CSV file input (replace mock data processing with actual CSV processing)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Mock CSV processing for demonstration purposes
            setCsvData(['Example Contact 1', 'Example Contact 2']);
        }
    };

    // Placeholder function for triggering auto-calls
    const startAutoCall = async () => {
        setLoading(true);
        setCallStatus('Auto-call initiated...');
        try {
            // Simulate API call with a delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setCallStatus('All calls placed successfully!');
        } catch (error) {
            setCallStatus('Error initiating auto-call.');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Auto-Call System</h2>
            <form>
                <label>
                    Enter Dial-In Number:
                    <input
                        type="text"
                        value={dialInNumber}
                        onChange={(e) => setDialInNumber(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Select Queue:
                    <input
                        type="text"
                        value={queue}
                        onChange={(e) => setQueue(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Upload CSV File:
                    <input type="file" accept=".csv" onChange={handleFileChange} />
                </label>
                <br />
                <button type="button" onClick={startAutoCall} disabled={loading}>
                    {loading ? 'Processing...' : 'Start Auto-Call'}
                </button>
            </form>
            <h3>Call Status</h3>
            <p>{callStatus}</p>
            <h3>CSV Data Preview</h3>
            <ul>
                {csvData.map((contact, index) => (
                    <li key={index}>{contact}</li>
                ))}
            </ul>
        </div>
    );
};

export default AutoCallFrontend;
