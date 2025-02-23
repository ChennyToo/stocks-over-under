import React from 'react';
import './GameScreen.css'; // Import CSS for this screen
import overButtonImage from './Images/realGreen.jpg'; // Import the "Over" button image
import underButtonImage from './Images/realRed.webp'; // Import the "Under" button image
import vsImage from './Images/realVS.jpg'; // Import the "Vs" button image

function GameScreen({ currentTicker, setCurrentTicker, nextTicker, setNextTicker }) {
  // Function to handle button clicks
  const handleButtonClick = (choice) => {
    alert(`You chose: ${choice}`);
    // Add logic for handling the choice (e.g., navigating to another screen or updating state)
  };

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
        <div>Stock1</div>
        <div className="price">$50.00</div>
      </div>
      <div className="stock-label stock2">
        <div>Stock2</div>
        <div className="price">$150.00</div>
      </div>

         {/* Score Text */}
      <div className="score-text">Score: 0</div>

      {/* Buttons */}
      <div className="buttons-container">
        <button
          className="image-button over-button"
          onClick={() => handleButtonClick('Over')}
        >
          <img src={overButtonImage} alt="Over" />
        </button>
        <button
          className="image-button under-button"
          onClick={() => handleButtonClick('Under')}
        >
          <img src={underButtonImage} alt="Under" />
        </button>
      </div>
    </div>

  );
}

export default GameScreen;