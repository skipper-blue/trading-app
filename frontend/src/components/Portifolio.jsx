export default function Portfolio({holdings=[]}){
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="font-semibold mb-3">Portfolio</h3>
      <ul>
        {holdings.map((h) => (
          <li key={h.symbol} className="flex justify-between py-2 border-b border-gray-700">
            <span>{h.symbol}</span>
            <span>{h.amount} — ${h.estimated ?? "0"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
