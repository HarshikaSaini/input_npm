import React, { useState, useEffect } from "react";
import {ReusableFormComponentProps } from "./Interface"


const ReusableFormComponent: React.FC<ReusableFormComponentProps> = ({
  formId,
  fields,
  onFormChange,
}) => {
  
  // Maintain state for all field values
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  useEffect(() => {
    // Initialize form values from parent (if they exist)
    const initialValues: Record<string, string | string[] | File | null> = fields.reduce((acc: Record<string, string | string[] | File | null>, field) => {
      acc[field.id] = field.value || ''; // Use value passed in `fields`, or default to empty string
      return acc;
    }, {});
    setFormValues(initialValues);
  }, [fields]);


  const handleInputChange = (id: string, value: string | any) => {
    // Update state for the corresponding field
    setFormValues((prev) => {
      const updatedValues = { [id]: value };
      const newFormValues = { ...prev, ...updatedValues };

      // Trigger the callback if provided (this updates the parent state)
      if (onFormChange) {
        onFormChange(newFormValues);
      }

      return newFormValues;
    });
  }


  const renderField = (field: any) => {
    const scopedId = `${formId}-${field.id}`; // Scoped unique ID

    switch (field.inputType) {
      case "checkbox":
        return (
          <div className={field.mainContainer} key={scopedId}>
            <label className={field.labelClass}>{field.label}</label>
            {field.options?.map((option: any) => (
              <div key={option.value}>
                <input
                  type="checkbox"
                  id={`${scopedId}-${option.value}`}
                  value={option.value}
                  checked={(formValues[field.id] || []).includes(option.value)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(formValues[field.id] || []), option.value]
                      : (formValues[field.id] || []).filter((v: string) => v !== option.value);
                    handleInputChange(field.id, newValue);
                  }}
                />
                <label htmlFor={`${scopedId}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        );

      case "radio":
        return (
          <div className={field.mainContainer} key={scopedId}>
            <label className={field.labelClass}>{field.label}</label>
            {field.options?.map((option: any) => (
              <div key={option.value}>
                <input
                  type="radio"
                  id={`${scopedId}-${option.value}`}
                  name={field.id} // Ensures only one radio button is selected per group
                  value={option.value}
                  checked={formValues[field.id] === option.value}
                  onChange={() => handleInputChange(field.id, option.value)}
                />
                <label htmlFor={`${scopedId}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        );

      case "file":
        return (
          <div className={field.mainContainer} key={scopedId}>
            <label className={field.labelClass}>{field.label}</label>
            <input
              type="file"
              accept={field.accept}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleInputChange(field.id, file);
              }}
            />
          </div>
        );

      default:
        return (
          <div className={field.mainContainer} key={scopedId}>
            <label className={field.labelClass} htmlFor={scopedId}>
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.inputType || "text"}
              value={formValues[field.id] || field.value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={field.className}
              style={field.style}
              onBlur={() => field.onBlur && field.onBlur(field.value || "")}
              onFocus={field.onFocus}
            />
          </div>
        );
    }
  };

  return <div>{fields?.map(renderField)}</div>;
  
};

export  default ReusableFormComponent;