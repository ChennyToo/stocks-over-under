import Alpaca from "@alpacahq/alpaca-trade-api";

// Initialize Alpaca with your API keys
const alpaca = new Alpaca({
  keyId: "PK4IVA4GEQIBI3VFJARZ",
  secretKey: "3I2n7FcUtDFQjN3nYn7NwDDWoXF9kYtxW9q2hkLr",
});

// Function to fetch crypto bars
export async function getCryptoBars() {
  const options = {
    start: "2022-09-01",
    end: "2022-09-07",
    timeframe: alpaca.newTimeframe(1, alpaca.timeframeUnit.DAY),
  };

  const bars = await alpaca.getCryptoBars(["BTC/USD"], options);
  return bars.get("BTC/USD");
}