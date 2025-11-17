import * as styles from "./FormButton.css";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const FormButton = ({
  type = "button",
  disabled = false,
  children,
  onClick,
}: FormButtonProps) => {
  return (
    <button
      type={type}
      className={styles.button({ disabled })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FormButton;
