import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import { FormButton } from "@shared/components";
import { getUserId, removeUserId } from "@shared/utils/storage";

import * as styles from "./mypage.css";
import Navigation from "@pages/mypage/components/Navigation";
import { getUserInfoApi, updateUserInfoApi } from "@pages/mypage/api/user";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    id: 0,
    username: "",
    name: "",
    email: "",
    age: 0,
    status: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = getUserId();
      if (!userId) {
        navigate(ROUTE_PATH.LOGIN);
        return;
      }

      try {
        const response = await getUserInfoApi(userId);
        const data = response.data;
        setUserInfo({
          id: data.id,
          username: data.username,
          name: data.name,
          email: data.email,
          age: data.age,
          status: data.status,
        });
        setFormData({
          name: data.name || "",
          email: data.email || "",
          age: data.age ? String(data.age) : "",
        });
      } catch {
        removeUserId();
        alert("사용자 정보를 불러오는데 실패했습니다.");
        navigate(ROUTE_PATH.LOGIN);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ageNumber = Number(formData.age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      alert("올바른 나이를 입력해주세요.");
      return;
    }

    try {
      const userId = getUserId();
      if (!userId) {
        return;
      }

      const response = await updateUserInfoApi(userId, {
        name: formData.name,
        email: formData.email,
        age: ageNumber,
      });

      const updatedData = response.data;
      setUserInfo({
        id: updatedData.id,
        username: updatedData.username,
        name: updatedData.name,
        email: updatedData.email,
        age: updatedData.age,
        status: updatedData.status,
      });
      alert("저장되었습니다.");
    } catch {
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Navigation name={userInfo.name || ""} />
      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>내 정보</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.label}>아이디</label>
            <input
              type="text"
              value={userInfo.username || ""}
              readOnly
              className={styles.readOnlyInput}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>이름</label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>이메일</label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>나이</label>
            <input
              type="number"
              value={formData.age || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, age: e.target.value }))
              }
              className={styles.input}
            />
          </div>

          <FormButton type="submit">저장</FormButton>
        </form>
      </div>
    </div>
  );
};

export default MyPage;
