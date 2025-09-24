import { useState } from "react";
import { placeOrder } from "../services/api";

export default function TradeForm({onOrderPlaced}) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [type, setType] = useState("BUY");
  const [amount, setAmount] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const payload = { symbol, type, amount: parseFloat(amount) };
    try {
      const res = await placeOrder(payload);
      onOrderPlaced && onOrderPlaced(res.data);
    } catch (err){
      alert(err?.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={submit} className="bg-gray-800 p-4 rounded-md">
      <h3 className="font-semibold mb-3">Place Order</h3>
      <div className="flex gap-2 mb-2">
        <input value={symbol} onChange={e=>setSymbol(e.target.value)} className="p-2 bg-gray-900 rounded" />
        <select value={type} onChange={e=>setType(e.target.value)} className="p-2 bg-gray-900 rounded">
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} className="p-2 bg-gray-900 rounded" />
      </div>
      <button className="bg-blue-600 px-4 py-2 rounded">Submit</button>
    </form>
  );
}
