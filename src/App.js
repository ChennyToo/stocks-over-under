import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling
import stockImage from './Images/SSlogo.png'; // Import your image file
import GameScreen from './GameScreen'; // Import the new GameScreen component

function HomeScreen() {
  const navigate = useNavigate();

  // Function to handle button click
  const handleStart = () => {
    navigate('/game'); // Navigate to the game screen
  };

  return (
    <div className="App">
      {/* Rounded Image */}
      <img src={stockImage} alt="Stock" className="rounded-image" />

      {/* Main Heading */}
      <h1 className="heading">How well do you know the S&P 500?</h1>

      {/* Description */}
      <p className="description">
        Put your knowledge to the test by simply deciding if you think a stock price is Over or Under the given price
      </p>

      {/* Start Button */}
      <button className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </Router>
  );
}

export default App;