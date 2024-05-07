import React from 'react';
import './App.css'; // Ensure your CSS matches the design you want
import AutoCallFrontend from './AutoCallFrontend'; // Make sure this path aligns with your structure

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>My Application</h1>
            </header>
            {/* Render the AutoCallFrontend component */}
            <AutoCallFrontend />
        </div>
    );
}

export default App;
