import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/registerPharamcist", data);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setData({...data, name: e.target.value})}/>
      <input placeholder="Email" onChange={(e) => setData({...data, email: e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e) => setData({...data, password: e.target.value})}/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}