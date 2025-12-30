import * as styles from "./back-button.css";

interface BackButtonProps {
  onClick: () => void;
}

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.backButton}
      aria-label="뒤로가기"
    >
      ←
    </button>
  );
};

export default BackButton;
