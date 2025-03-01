import React from 'react';
import './GameScreen.css'; // Import CSS for this screen
import overButtonImage from './Images/realGreen.jpg'; // Import the "Over" button image
import underButtonImage from './Images/realRed.webp'; // Import the "Under" button image
import vsImage from './Images/realVS.jpg'; // Import the "Vs" button image
import { useEffect, useRef } from 'react';

function GameScreen({ currentTicker, nextTicker, initializeGame, handleGuess, score }) {
  // Function to handle button clicks
  const handleButtonClick = (choice) => {
    handleGuess(choice);
    // Add logic for handling the choice (e.g., navigating to another screen or updating state)
  };

const renderAfterCalled = useRef(false);

useEffect(() => {
    if (!renderAfterCalled.current) {
      initializeGame();
    }

    renderAfterCalled.current = true;
}, []);


  return (
    <div className="game-screen">
      {/* Prompt */}
      <h1 className="prompt">Is the stock price on the right Over or Under?</h1>
      
      {/* Vertical Red Bar */}
      <div className="vertical-bar"></div>

       {/* Circular VS Image */}
       <img src={vsImage} alt="VS" className="vs-image" />

      {/* Text Labels */}
      <div className="stock-label stock1">
        <div>{currentTicker.name}</div>
        <div className="price">${currentTicker.price}</div>
      </div>
      <div className="stock-label stock2">
        <div>{nextTicker.name}</div>
        <div className="price">${nextTicker.price}</div>
      </div>

         {/* Score Text */}
      <div className="score-text">Score: {score}</div>

      {/* Buttons */}
      <div className="buttons-container">
        <button
          className="image-button over-button"
          onClick={() => handleButtonClick(true)}
        >
          <img src={overButtonImage} alt="Over" />
        </button>
        <button
          className="image-button under-button"
          onClick={() => handleButtonClick(false)}
        >
          <img src={underButtonImage} alt="Under" />
        </button>
      </div>
    </div>

  );
}

export default GameScreen;