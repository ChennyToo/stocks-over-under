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

app.get('/api/crypto-bars', async (req, res) => {
  try {
    const options = {
      start: "2022-09-01",
      end: "2022-09-07",
      timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.DAY),
    };

    const bars = await alpaca.getCryptoBars(["BTC/USD"], options);
    res.json(bars.get("BTC/USD"));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});