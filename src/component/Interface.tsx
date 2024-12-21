export interface FormField {
  id: string; // Unique identifier for the field (relative to the form)
  label: string; // Label for the field
  inputType?: string; // Type of input (default: "text")
  placeholder?: string; // Placeholder for the input
  className?: string; // CSS class for the input
  style?: React.CSSProperties; // Inline styles for the input
  onBlur?: (value: string) => void; // Blur event handler
  onFocus?: () => void ; // Focus event handler
  labelClass?:string; 
  inputContainer?:string;
}

export interface ReusableFormComponentProps {
  formId: string; // Unique form ID to scope field names
  fields: FormField[]; // Array of field objects
  onFormChange?: (updatedValues: Record<string, string>) => void; // Callback when form changes
}
