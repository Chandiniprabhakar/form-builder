import { useState } from "react";

export default function Login({ onSuccess }) {
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://dynamic-form-generator-9rl7.onrender.com/create-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rollNumber, name }),
        }
      );

      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        alert("User registered successfully!");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);
      alert("Registration error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
      );
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        onSuccess(data.form);
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      alert("Login error");
    }
  };

  return (
    <div>
      <div>
        <h2>Dynamic Forms</h2>
        <p> Enter the following details </p>

        <form className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <button onClick={handleRegister} disabled={loading}>
              Register
            </button>

            <button
              onClick={handleLogin}
              disabled={loading || !rollNumber || !name}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
