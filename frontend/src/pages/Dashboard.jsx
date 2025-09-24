import { useEffect, useState } from "react";
import MarketCard from "../components/MarketCard";
import Portfolio from "../components/Portifolio"; // fixed typo here
import TradesTable from "../components/TradeTable";
import TradeForm from "../components/TradeForm";
import { getMarketPrice, fetchOrders } from "../services/api";
import { supabase } from "../services/supabaseClient";

export default function Dashboard(){
  const [btc, setBtc] = useState(null);
  const [eth, setEth] = useState(null);
  const [orders, setOrders] = useState([]);
  const [holdings, setHoldings] = useState([
    { symbol: "BTC", amount: 0.5, estimated: 15000 },
    { symbol: "ETH", amount: 2.0, estimated: 3000 },
  ]);

  useEffect(()=>{
    const load = async () => {
      try {
        const { data: btcData } = await getMarketPrice("BTCUSDT");
        const { data: ethData } = await getMarketPrice("ETHUSDT");
        setBtc(btcData.price);
        setEth(ethData.price);
      } catch (err){ console.error(err); }
    };

    const loadOrders = async () => {
      const res = await fetchOrders();
      setOrders(res.data ?? []);
    };

    load();
    loadOrders();

    // subscribe to Supabase realtime for orders / portfolio updates
    const subscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {
        setOrders(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return ()=> { 
      supabase.removeChannel(subscription); // works for supabase-js v2+
      // If using v1, use: subscription.unsubscribe();
    }
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MarketCard title="BTC/USDT" price={btc} change="+0.8%" />
        <MarketCard title="ETH/USDT" price={eth} change="-0.1%" />
        <Portfolio holdings={holdings} />
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <TradeForm onOrderPlaced={(o)=>setOrders(prev => [o, ...prev])} />
        <TradesTable trades={orders} />
      </section>
    </div>
  );
}
