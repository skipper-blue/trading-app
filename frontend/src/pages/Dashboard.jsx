import { useEffect, useState, useCallback } from "react";
import MarketCard from "../components/MarketCard";
import Portfolio from "../components/Portifolio"; // fixed typo here
import TradesTable from "../components/TradeTable";
import TradeForm from "../components/TradeForm";
import { getMarketPrice, fetchOrders } from "../services/api";
import { supabase } from "../services/supabaseClient";

export default function Dashboard() {
  const [btc, setBtc] = useState(null);
  const [eth, setEth] = useState(null);
  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([
    { symbol: "BTC", amount: 0.5, estimated: 15000 },
    { symbol: "ETH", amount: 2.0, estimated: 3000 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch market prices
  const loadPrices = useCallback(async () => {
    try {
      const { data: btcData } = await getMarketPrice("BTCUSDT");
      const { data: ethData } = await getMarketPrice("ETHUSDT");
      setBtc(btcData.price);
      setEth(ethData.price);
    } catch (err) {
      setError("Failed to fetch market prices.");
      console.error(err);
    }
  }, []);

  // Fetch orders
  const loadOrders = useCallback(async () => {
    try {
      const res = await fetchOrders();
      setOrders(res.data ?? []);
    } catch (err) {
      setError("Failed to fetch orders.");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.all([loadPrices(), loadOrders()])
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));

    // Subscribe to Supabase realtime for orders updates
    const channel = supabase
      .channel("public:orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadPrices, loadOrders]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-slate-400">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MarketCard title="BTC/USDT" price={btc} change="+0.8%" />
        <MarketCard title="ETH/USDT" price={eth} change="-0.1%" />
        <Portfolio holdings={holdings} />
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <TradeForm onOrderPlaced={(o) => setOrders((prev) => [o, ...prev])} />
        <TradesTable trades={orders} />
      </section>
    </div>
  );
}
