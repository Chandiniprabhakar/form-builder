import "./styles.css";
import { useState } from "react";
import DynamicForm from "./components/DynamicForm";
import Login from "./components/Login";

export interface FormField {
  fieldId: string;
  label: string;
  type: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  validation?: { message?: string };
  options?: { label: string; value: string; dataTestId: string }[];
  dataTestId: string;
}

export interface FormSection {
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormStructure {
  sections: FormSection[];
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formStructure, setFormStructure] = useState<FormStructure | null>(
    null
  );

  const handleLoginSuccess = (form: FormStructure) => {
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
