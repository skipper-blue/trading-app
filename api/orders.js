const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { symbol, type, amount } = req.body;
      // fetch current price from Binance
      const priceRes = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`);
      const price = parseFloat(priceRes.data.price);

      // create order row in supabase
      const { data, error } = await supabaseAdmin
        .from("orders")
        .insert([
          { user_id: req.body.user_id || null, symbol, type, amount, price }
        ])
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === "GET") {
      const { data, error } = await supabaseAdmin
        .from("orders")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return res.status(200).json({ data });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
