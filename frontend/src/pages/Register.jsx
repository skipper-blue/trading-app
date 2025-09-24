import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    alert("Check your email to confirm.");
    nav("/");
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={register} className="space-y-3">
        <input className="w-full p-2 rounded bg-gray-800" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 rounded bg-gray-800" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-green-600 px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
