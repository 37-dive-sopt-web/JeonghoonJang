import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import { signupApi } from "../api/signup";
import * as styles from "../signup.css";

interface Step3InfoProps {
  onPrev: () => void;
  formData: {
    username: string;
    password: string;
  };
}

const Step3Info = ({ onPrev, formData }: Step3InfoProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  // 입력 검증 메시지 함수
  const getValidationMessage = (): string | null => {
    if (name.trim().length === 0) {
      return null;
    }

    if (email.trim().length === 0) {
      return "이메일을 입력해주세요";
    }

    if (age.trim().length === 0) {
      return "나이를 입력해주세요";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      alert("올바른 나이를 입력해주세요.");
      return;
    }

    try {
      const response = await signupApi({
        username: formData.username,
        password: formData.password,
        name,
        email,
        age: ageNumber,
      });
      localStorage.setItem("userId", String(response.id));
      alert(`${name}님, 회원가입이 완료되었습니다.`);
      navigate(ROUTE_PATH.LOGIN);
    } catch {
      alert("회원가입에 실패했습니다.");
    }
  };

  const validationMessage = getValidationMessage();
  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    age.trim() !== "" &&
    validationMessage === null;

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
            <label htmlFor="name" className={styles.label}>
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해 주세요"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="age" className={styles.label}>
              나이
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="숫자로 입력"
              className={styles.input}
            />
          </div>

          {validationMessage && (
            <div className={styles.errorMessage}>{validationMessage}</div>
          )}

          <button
            type="submit"
            className={styles.nextButton({ disabled: !isFormValid })}
          >
            회원가입
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

export default Step3Info;
