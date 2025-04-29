import { useState } from "react";

export default function DynamicForm({ formStructure }) {
  const sections = formStructure.sections;
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    let error = "";

    if (field.required && !value) {
      error = field.validation?.message || "This field is required";
    } else if (field.minLength && value.length < field.minLength) {
      error = `Minimum length is ${field.minLength}`;
    } else if (field.maxLength && value.length > field.maxLength) {
      error = `Maximum length is ${field.maxLength}`;
    }

    return error;
  };

  const validateSection = () => {
    const newErrors = {};
    sections[currentSection].fields.forEach((field) => {
      const value = formData[field.fieldId] || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.fieldId] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e, field) => {
    const value = field.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({ ...formData, [field.fieldId]: value });

    if (errors[field.fieldId]) {
      setErrors({ ...errors, [field.fieldId]: validateField(field, value) });
    }
  };

  const handleOptionChange = (field, optionValue) => {
    setFormData({ ...formData, [field.fieldId]: optionValue });
    if (errors[field.fieldId]) {
      setErrors({
        ...errors,
        [field.fieldId]: validateField(field, optionValue),
      });
    }
  };

  const handleNext = () => {
    if (validateSection()) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = () => {
    if (validateSection()) {
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully! Check console.");
    }
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.fieldId,
      "data-testid": field.dataTestId,
      value: formData[field.fieldId] || "",
      onChange: (e) => handleChange(e, field),
      placeholder: field.placeholder || "",
      className: "border p-2 w-full",
    };

    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
        return <input type={field.type} {...commonProps} />;
      case "textarea":
        return <textarea {...commonProps} />;
      case "dropdown":
        return (
          <select {...commonProps}>
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option.value} className="block">
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={formData[field.fieldId] === option.value}
                  onChange={() => handleOptionChange(field, option.value)}
                  data-testid={option.dataTestId}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={!!formData[field.fieldId]}
            onChange={(e) => handleChange(e, field)}
            data-testid={field.dataTestId}
          />
        );
      default:
        return null;
    }
  };

  const currentFields = sections[currentSection].fields;

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">
        {sections[currentSection].title}
      </h2>
      <p className="mb-4 text-gray-600">
        {sections[currentSection].description}
      </p>

      {currentFields.map((field) => (
        <div key={field.fieldId} className="mb-4">
          <label htmlFor={field.fieldId} className="block mb-1 font-semibold">
            {field.label}
          </label>
          {renderField(field)}
          {errors[field.fieldId] && (
            <p className="text-red-500 text-sm">{errors[field.fieldId]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        {currentSection > 0 && (
          <button
            onClick={handlePrev}
            className="bg-gray-300 py-2 px-4 rounded"
          >
            Prev
          </button>
        )}
        {currentSection < sections.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
