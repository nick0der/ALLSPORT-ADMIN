import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apis";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    navigate("/");
  };

  return (
    <div className="loginContainter">
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width:100 }}>
        Login
      </button>
    </div>
  );
}
