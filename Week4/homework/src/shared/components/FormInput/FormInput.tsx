import * as styles from "./FormInput.css";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  error?: string | null;
}

const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  readOnly = false,
  error,
}: FormInputProps) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={readOnly ? styles.readOnlyInput : styles.input}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default FormInput;

