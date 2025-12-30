import { useState } from "react";
import { Link } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import { PasswordInput, FormButton, BackButton } from "@shared/components";
import { validatePassword, isPasswordMatch } from "@shared/utils/validation";
import * as styles from "../signup.css";

interface Step2PasswordProps {
  onNext: (password: string) => void;
  onPrev: () => void;
}

const Step2Password = ({ onNext, onPrev }: Step2PasswordProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    onNext(password);
  };

  const passwordValidation = validatePassword(password, confirmPassword);
  const passwordValidationMessage = passwordValidation.message;
  const isPasswordMismatch =
    confirmPassword.length > 0 && !isPasswordMatch(password, confirmPassword);
  const isFormValid =
    passwordValidation.isValid &&
    confirmPassword.trim() !== "" &&
    isPasswordMatch(password, confirmPassword);

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <div className={styles.header}>
          <BackButton onClick={onPrev} />
          <h1 className={styles.title}>회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <PasswordInput
            id="password"
            label="비밀번호"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호를 입력해 주세요"
            error={passwordValidationMessage}
          />

          <PasswordInput
            id="confirmPassword"
            label="비밀번호 확인"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="비밀번호를 다시 입력해 주세요"
            error={
              isPasswordMismatch && !passwordValidationMessage
                ? "비밀번호가 일치하지 않아요"
                : null
            }
          />

          <FormButton type="submit" disabled={!isFormValid}>
            다음
          </FormButton>
        </form>

        <div>
          <span className={styles.footerText}>
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
