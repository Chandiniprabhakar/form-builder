import "./styles.css";

import { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import Login from "./components/Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formStructure, setFormStructure] = useState(null);

  const handleLoginSuccess = (form) => {
    setFormStructure(form);
    setIsLoggedIn(true);
  };

  return (
    <div className="p-4">
      {!isLoggedIn ? (
        <Login onSuccess={handleLoginSuccess} />
      ) : formStructure ? (
        <DynamicForm formStructure={formStructure} />
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
}
