import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE || "";

export const getMarketPrice = (symbol) => axios.get(`${BASE}/api/market?symbol=${symbol}`);
export const placeOrder = (payload) => axios.post(`${BASE}/api/orders`, payload);
export const fetchOrders = () => axios.get(`${BASE}/api/orders`);
