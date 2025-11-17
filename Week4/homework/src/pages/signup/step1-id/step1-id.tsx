import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import * as styles from "../signup.css";

interface Step1IdProps {
  onNext: (username: string) => void;
}

const Step1Id = ({ onNext }: Step1IdProps) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && username.length <= 50) {
      onNext(username);
    }
  };

  const isFormValid = username.trim() !== "" && username.length <= 50;
  const isTooLong = username.length > 50;

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <div className={styles.header}>
          <button
            type="button"
            onClick={() => navigate(ROUTE_PATH.LOGIN)}
            className={styles.backButton}
            aria-label="뒤로가기"
          >
            ←
          </button>
          <h1 className={styles.title}>회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              아이디
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력해 주세요"
              className={styles.input}
            />
          </div>

          {isTooLong && (
            <div className={styles.errorMessage}>
              아이디는 50자 이하로 입력해주세요
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

export default Step1Id;
