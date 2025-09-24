export default function MarketCard({title, price, change}){
  return (
    <div className="bg-gray-800 p-4 rounded-md shadow">
      <div className="flex justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm">{change}</div>
      </div>
      <div className="text-2xl mt-2">${price ?? "—"}</div>
    </div>
  );
}
