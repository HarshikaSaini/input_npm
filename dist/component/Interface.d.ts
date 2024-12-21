export interface FormField {
    id: string;
    label: string;
    inputType?: string;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
    onBlur?: (value: string) => void;
    onFocus?: () => void;
    labelClass?: string;
    inputContainer?: string;
}
export interface ReusableFormComponentProps {
    formId: string;
    fields: FormField[];
    onFormChange?: (updatedValues: Record<string, string>) => void;
}
