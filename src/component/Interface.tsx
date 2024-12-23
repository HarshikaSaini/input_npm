export interface FormField {
  id: string; // Unique identifier for the field (relative to the form)
  value: string | string[] | File | null;
  label: string; // Label for the field
  inputType: "text" | "email" | "string" | "radio" | "checkbox" | "file" | "number"; // Type of input (default: "text")
  placeholder?: string; // Placeholder for the input
  options?: { label: string; value: string }[]; // For radio/checkbox
  accept?: string; // For file input
  className?: string; // CSS class for the input
  style?: React.CSSProperties; // Inline styles for the input
  onBlur?: (value: string) => void; // Blur event handler
  onFocus?: () => void ; // Focus event handler
  labelClass?:string; 
  mainContainer?:string;
}

export interface ReusableFormComponentProps {
  formId: string; // Unique form ID to scope field names
  fields: FormField[]; // Array of field objects
  onFormChange?: (updatedValues: Record<string, string>) => void; // Callback when form changes
}
