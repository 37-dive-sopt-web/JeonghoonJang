import { useState } from "react";

import type { User } from "@shared/types/user";
import { FormInput, FormButton } from "@shared/components";
import { isValidNumber } from "@shared/utils/validation";
import { getUserInfoApi } from "@pages/mypage/api/user";
import Navigation from "@pages/mypage/components/Navigation";
import * as styles from "./members.css";

const Members = () => {
  const [memberId, setMemberId] = useState("");
  const [memberInfo, setMemberInfo] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMemberInfo(null);

    if (!isValidNumber(memberId)) {
      setError("올바른 회원 ID를 입력해주세요.");
      return;
    }

    const id = Number(memberId);

    try {
      const response = await getUserInfoApi(id);
      setMemberInfo(response.data);
    } catch {
      setError("회원 정보를 불러오는데 실패했습니다.");
    }
  };

  const isFormValid = memberId.trim() !== "";

  return (
    <div className={styles.container}>
      <Navigation name="" />
      <div className={styles.content}>
        <h2 className={styles.title}>회원 조회</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            id="memberId"
            label="회원 ID"
            type="number"
            value={memberId}
            onChange={setMemberId}
            placeholder="회원 ID를 입력해주세요"
            error={error}
          />

          <FormButton type="submit" disabled={!isFormValid}>
            확인
          </FormButton>
        </form>

        {memberInfo && (
          <div className={styles.memberInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>이름</span>
              <span className={styles.infoValue}>{memberInfo.name}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>아이디</span>
              <span className={styles.infoValue}>{memberInfo.username}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>이메일</span>
              <span className={styles.infoValue}>{memberInfo.email}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>나이</span>
              <span className={styles.infoValue}>{memberInfo.age}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
