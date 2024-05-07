// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AuthProvider from './AuthProvider'; // Adjust the path
import ProtectedRoute from './ProtectedRoute'; // Adjust the path
import AuthPage from './AuthPage'; // Adjust path
import CsvUploaderPage from './CsvUploaderPage'; // Adjust path
import AudioGeneratorPage from './AudioGeneratorPage'; // Adjust path

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>My Application</h1>
            {/* Navigation Links */}
            <nav>
              <Link to="/auth">Auth</Link> |{' '}
              <Link to="/csv-uploader">CSV Uploader</Link> |{' '}
              <Link to="/audio-generator">Audio Generator</Link>
            </nav>
          </header>
          <div className="App-content">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/csv-uploader"
                element={
                  <ProtectedRoute>
                    <CsvUploaderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/audio-generator"
                element={
                  <ProtectedRoute>
                    <AudioGeneratorPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<h2>Welcome to My Application!</h2>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
