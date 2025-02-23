import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling
import stockImage from './Images/SSlogo.png'; // Import your image file
import GameScreen from './GameScreen'; // Import the new GameScreen component
import {useState, useEffect} from 'react';
import sp500Companies from './sp500-data.js';

function HomeScreen() {
  const navigate = useNavigate();

  // Function to handle button click
  const handleStart = () => {
    navigate('/game'); // Navigate to the game screen
  };
// Disable scrolling 
useEffect(() => {
  document.body.style.overflow = 'hidden'; // Disable scrolling
  return () => {
    document.body.style.overflow = 'auto'; // Re-enable scrolling when the component unmounts
  };
}, []);
  return (
    
    <div className="App">
      {/* Rounded Image */}
      <img src={stockImage} alt="Stock" className="rounded-image" />

      {/* Main Heading */}
      <h1 className="heading">How well do you know the S&P 500?</h1>

      {/* Description */}
      <p className="description">
        Put your knowledge to the test by simply deciding if you think a stock price is Over or Under another stock price
      </p>

      {/* Start Button */}
      <button className="start-button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
}


function App() {
  const [currentTicker, setCurrentTicker] = useState(null);
  const [nextTicker, setNextTicker] = useState(null);

  const getTicker = async (tickerSymbol) => {
    try {
      // Add the tickerSymbol as a query parameter
      const response = await fetch(`http://localhost:3001/api/stock-ticker?symbol=${tickerSymbol}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const tickerPrice = await response.json();
      return tickerPrice;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getRandomTicker = async () => {
    try {
      // Get a random company from the list
      const randomIndex = Math.floor(Math.random() * sp500Companies.length);
      const randomCompany = sp500Companies[randomIndex];      
      // Fetch data for the random ticker
      const tickerPrice = await getTicker(randomCompany.symbol);
      // Return both the company info and the fetched data
      console.log(randomCompany.symbol, randomCompany.name, tickerPrice)
      return {
        company: randomCompany,
        data: tickerPrice,
      };
    } catch (error) {
      console.error('Error in getRandomTicker:', error);
      throw error;
    }
  };



  useEffect(() => {
    getRandomTicker();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home Screen */}
        <Route path="/" element={<HomeScreen />} />

        {/* Game Screen */}
        <Route
          path="/game"
          element={
            <GameScreen
              currentTicker={currentTicker}
              setCurrentTicker={setCurrentTicker}
              nextTicker={nextTicker}
              setNextTicker={setNextTicker}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;