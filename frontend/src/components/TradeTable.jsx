export default function TradesTable({trades=[]}){
  return (
    <div className="bg-gray-800 p-4 rounded-md">
      <h3 className="font-semibold mb-3">Recent Trades</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2">Date</th><th>Symbol</th><th>Type</th><th>Amount</th><th>Price</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((t,i)=>(
            <tr key={i} className="border-b border-gray-800">
              <td className="p-2">{t.created_at?.split('T')[0]}</td>
              <td>{t.symbol}</td>
              <td className={t.type === 'BUY' ? 'text-green-400' : 'text-red-400'}>{t.type}</td>
              <td>{t.amount}</td>
              <td>${t.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
