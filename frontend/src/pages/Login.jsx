import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    nav("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={login} className="space-y-3">
        <input className="w-full p-2 rounded bg-gray-800" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 rounded bg-gray-800" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-blue-600 px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
