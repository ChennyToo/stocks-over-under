const express = require('express');
const cors = require('cors'); // Import the cors package
const Alpaca = require('@alpacahq/alpaca-trade-api');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());
const alpaca = new Alpaca({
  keyId: "PK4IVA4GEQIBI3VFJARZ",
  secretKey: "3I2n7FcUtDFQjN3nYn7NwDDWoXF9kYtxW9q2hkLr",
});





app.get('/api/stock-ticker', async (req, res) => {
  try {
    const tickerSymbol = req.query.symbol; // Get the ticker symbol from the query parameter
    if (!tickerSymbol) {
      return res.status(400).json({ error: 'Ticker symbol is required' });
    }
    const snapshot = await alpaca.getSnapshot(tickerSymbol);
    res.json(snapshot.LatestTrade.Price); //Return only the most recent price of said stock
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});