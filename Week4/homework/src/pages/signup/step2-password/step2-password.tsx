import { useState } from "react";
import { Link } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import * as styles from "../signup.css";

interface Step2PasswordProps {
  onNext: (password: string) => void;
  onPrev: () => void;
}

const Step2Password = ({ onNext, onPrev }: Step2PasswordProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 비밀번호 유효성 검사 함수들
  const getPasswordValidationMessage = (pwd: string): string | null => {
    if (pwd.length === 0) return null;

    // 1. 8~64자 체크
    if (pwd.length < 8 || pwd.length > 64) {
      return "8~64자로 입력해주세요";
    }

    // 2. 대문자 포함 체크
    if (!/[A-Z]/.test(pwd)) {
      return "대문자를 포함해주세요";
    }

    // 3. 숫자 포함 체크
    if (!/[0-9]/.test(pwd)) {
      return "숫자를 포함해주세요";
    }

    // 4. 특수문자 포함 체크
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) {
      return "특수문자를 포함해주세요";
    }

    // 5. 비밀번호 확인 입력 체크
    if (confirmPassword.length === 0) {
      return "비밀번호를 모두 입력해주세요";
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    onNext(password);
  };

  const passwordValidationMessage = getPasswordValidationMessage(password);
  const isPasswordMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;
  const isFormValid =
    passwordValidationMessage === null &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword;

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <div className={styles.header}>
          <button
            type="button"
            onClick={onPrev}
            className={styles.backButton}
            aria-label="뒤로가기"
          >
            ←
          </button>
          <h1 className={styles.title}>회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              비밀번호
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? "보이기" : "숨기기"}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              비밀번호 확인
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력해 주세요"
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.eyeButton}
                aria-label={
                  showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                }
              >
                {showConfirmPassword ? "보이기" : "숨기기"}
              </button>
            </div>
          </div>

          {passwordValidationMessage && (
            <div className={styles.errorMessage}>
              {passwordValidationMessage}
            </div>
          )}

          {isPasswordMismatch && !passwordValidationMessage && (
            <div className={styles.errorMessage}>
              비밀번호가 일치하지 않아요
            </div>
          )}

          <button
            type="submit"
            className={styles.nextButton({ disabled: !isFormValid })}
          >
            다음
          </button>
        </form>

        <div>
          <span style={{ fontSize: "1.4rem", color: "#868E96" }}>
            이미 계정이 있나요?{" "}
          </span>
          <Link to={ROUTE_PATH.LOGIN} className={styles.loginLink}>
            <span className={styles.loginLinkText}>로그인으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Step2Password;
