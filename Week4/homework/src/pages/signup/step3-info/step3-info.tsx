import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import { FormInput, FormButton, BackButton } from "@shared/components";
import { setUserId } from "@shared/utils/storage";
import { isValidNumber } from "@shared/utils/validation";

import * as styles from "../signup.css";
import { signupApi } from "@pages/signup/api/signup";

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
    if (!isValidNumber(age)) {
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
      setUserId(response.data.id);
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
          <BackButton onClick={onPrev} />
          <h1 className={styles.title}>회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id="name"
            label="이름"
            value={name}
            onChange={setName}
            placeholder="이름을 입력해 주세요"
          />

          <FormInput
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.com"
            error={validationMessage}
          />

          <FormInput
            id="age"
            label="나이"
            type="number"
            value={age}
            onChange={setAge}
            placeholder="숫자로 입력"
          />

          {validationMessage && (
            <div className={styles.errorMessage}>{validationMessage}</div>
          )}

          <FormButton type="submit" disabled={!isFormValid}>
            회원가입
          </FormButton>
        </form>

        <div>
          <span className={styles.footerText}>이미 계정이 있나요? </span>
          <Link to={ROUTE_PATH.LOGIN} className={styles.loginLink}>
            <span className={styles.loginLinkText}>로그인으로 돌아가기</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Step3Info;
