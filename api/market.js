const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const symbol = (req.query.symbol || "BTCUSDT").toUpperCase();

    // Try Binance
    const binanceUrl = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
    const b = await axios.get(binanceUrl);
    if (b?.data) return res.status(200).json(b.data);

    // fallback CoinGecko (convert symbol)
    // For example mapping: BTCUSDT -> bitcoin
    res.status(500).json({ error: "No data" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
