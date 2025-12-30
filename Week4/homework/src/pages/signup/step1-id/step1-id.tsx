import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import { FormInput, FormButton, BackButton } from "@shared/components";
import { isValidUsernameLength } from "@shared/utils/validation";
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

  const isFormValid = username.trim() !== "" && isValidUsernameLength(username);
  const isTooLong = username.length > 50;

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <div className={styles.header}>
          <BackButton onClick={() => navigate(ROUTE_PATH.LOGIN)} />
          <h1 className={styles.title}>회원가입</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id="username"
            label="아이디"
            value={username}
            onChange={setUsername}
            placeholder="아이디를 입력해 주세요"
            error={isTooLong ? "아이디는 50자 이하로 입력해주세요" : null}
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

export default Step1Id;
