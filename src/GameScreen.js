import React from 'react';
import './GameScreen.css'; // Import CSS for this screen
import overButtonImage from './Images/realGreen.jpg'; // Import the "Over" button image
import underButtonImage from './Images/realRed.webp'; // Import the "Under" button image

function GameScreen() {
  // Function to handle button clicks
  const handleButtonClick = (choice) => {
    alert(`You chose: ${choice}`);
    // Add logic for handling the choice (e.g., navigating to another screen or updating state)
  };

  return (
    <div className="game-screen">
      {/* Prompt */}
      <h1 className="prompt">Is the stock price Over or Under $100?</h1>

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