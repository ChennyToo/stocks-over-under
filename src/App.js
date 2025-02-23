import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling
import stockImage from './Images/SSlogo.png'; // Import your image file
import GameScreen from './GameScreen'; // Import the new GameScreen component
import {useState, useEffect} from 'react';
import sp500Companies from './sp500-data.js';

function HomeScreen({initializeGame}) {
  const navigate = useNavigate();

  // Function to handle button click
  const handleStart = async () => {
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
  const loadingValue = {
    symbol: "LOAD",
    name: "loading",
    price: 0,
  }
  const [currentTicker, setCurrentTicker] = useState(loadingValue);
  const [nextTicker, setNextTicker] = useState(loadingValue);
  const [score, setScore] = useState(0);

  const initializeGame = async () => {
    const ticker1 = await getRandomTicker();
    const ticker2 = await getRandomTicker();
    console.log("Called init game");
    setCurrentTicker(ticker1);
    setNextTicker(ticker2);
    setScore(0);
  }

  const nextRound = async () => {
    
    const newTicker = await getRandomTicker();
    const prevTicker = nextTicker;
    const curScore = score + 1;
    setCurrentTicker(prevTicker);
    setNextTicker(newTicker);
    setScore(curScore);
  }

  const handleGuess = async (isHigher) => {
    if (nextTicker.price >= currentTicker.price && isHigher){
      nextRound();
    }

    else if (nextTicker.price <= currentTicker.price && !isHigher){
      nextRound();
    }

    else {
      alert("You Lose")
      initializeGame()
    }
  }





  const getTickerPrice = async (tickerSymbol) => {
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
      const tickerPrice = await getTickerPrice(randomCompany.symbol);
      // Return both the company info and the fetched data
      console.log(randomCompany.symbol, randomCompany.name, tickerPrice)

      return {
        symbol: randomCompany.symbol,
        name: randomCompany.name,
        price: tickerPrice,
      };
    } catch (error) {
      console.error('Error in getRandomTicker:', error);
      throw error;
    }
  };




  

  return (
    <Router>
      <Routes>
        {/* Home Screen */}
        <Route path="/" element={<HomeScreen initializeGame={initializeGame}/>} />

        {/* Game Screen */}
        <Route
          path="/game"
          element={
            <GameScreen
              initializeGame={initializeGame}
              currentTicker={currentTicker}
              setCurrentTicker={setCurrentTicker}
              nextTicker={nextTicker}
              setNextTicker={setNextTicker}
              handleGuess={handleGuess}
              score={score}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;