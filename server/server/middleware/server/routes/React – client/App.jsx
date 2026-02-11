import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin",
        password: "k@mb0j@PLG351"
      })
    });

    const result = await res.json();
    setToken(result.token);

    const dash = await fetch("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${result.token}` }
    });

    setData(await dash.json());
  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      {!token ? (
        <button onClick={login}>Login</button>
      ) : (
        <div>
          <h2>Dashboard</h2>
          <p>Students: {data?.siswa}</p>
          <p>Teachers: {data?.guru}</p>
          <p>Management: {data?.pengurus}</p>
          <p>Total: {data?.total}</p>
        </div>
      )}
    </div>
  );
}

export default App;
