import React, { useState, useEffect,useRef } from "react";
import {ReusableFormComponentProps } from "./Interface"
import { customEvent } from "./CustomEvent";

const ReusableFormComponent: React.FC<ReusableFormComponentProps> = ({
  formId,
  fields,
  onFormChange,
}) => {
  
  // Maintain state for all field values
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const uniqueEventId = useRef(`form-${formId}`).current; // Unique event ID for this form

  useEffect(() => {
    // Listen for events tied to this unique form ID
    const unsubscribe = customEvent.on(uniqueEventId, (data) => {
      setFormValues((prev) => ({ ...prev, ...data }));
      if (onFormChange) {
        onFormChange({ ...formValues, ...data });
      }
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [uniqueEventId, formValues, onFormChange]);

  const handleInputChange = (id: string, value: string) => {
    const updatedValues = { [id]: value };
    setFormValues((prev) => ({ ...prev, ...updatedValues }));

    // Emit an event with the updated values
    customEvent.emit(uniqueEventId, updatedValues);

    // Trigger the callback if provided
    if (onFormChange) {
      onFormChange({ ...formValues, ...updatedValues });
    }
  };

  return (
    <div>
      {fields?.map((field) => {
        const scopedId = `${formId}-${field.id}`; // Scoped unique ID
        return (
          <div className={field.inputContainer} key={scopedId}>
            <label className={field.labelClass} htmlFor={scopedId}>{field.label}</label>
            <input
              id={scopedId}
              type={field.inputType || "text"}
              value={formValues[scopedId] || ""}
              placeholder={field.placeholder || ""}
              onChange={(e) => handleInputChange(scopedId, e.target.value)}
              onBlur={() => field.onBlur?.(formValues[scopedId] || "")}
              onFocus={field.onFocus}
              className={field.className}
              style={field.style}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ReusableFormComponent;