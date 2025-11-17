import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import { FormInput, PasswordInput, FormButton } from "@shared/components";
import { setUserId } from "@shared/utils/storage";
import { loginApi } from "./api/login";
import * as styles from "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("아이디를 입력해주세요.");
      return;
    }

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await loginApi({ username, password });
      setUserId(response.data.userId);
      navigate(ROUTE_PATH.MYPAGE);
    } catch {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>로그인</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id="username"
            label="아이디"
            value={username}
            onChange={setUsername}
            placeholder="아이디를 입력해 주세요"
          />

          <PasswordInput
            id="password"
            label="비밀번호"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호를 입력해 주세요"
          />

          {error && <div className={styles.errorMessage}>{error}</div>}

          <FormButton type="submit" disabled={!isFormValid}>
            로그인
          </FormButton>
        </form>

        <Link to="/signup" className={styles.signupLink}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
