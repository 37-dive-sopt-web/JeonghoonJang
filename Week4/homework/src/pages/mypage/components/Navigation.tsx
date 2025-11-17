import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { ROUTE_PATH } from "@shared/router/path";
import { Modal } from "@shared/components";
import { getUserId, removeUserId } from "@shared/utils/storage";
import { deleteUserApi } from "@pages/mypage/api/user";
import * as styles from "./Navigation.css";

interface NavigationProps {
  name: string;
}

const Navigation = ({ name }: NavigationProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    const userId = getUserId();
    if (!userId) {
      return;
    }

    try {
      await deleteUserApi(userId);
      removeUserId();
      setIsDeleteModalOpen(false);
      alert("탈퇴가 완료되었습니다");
      navigate(ROUTE_PATH.LOGIN);
    } catch {
      alert("탈퇴에 실패했습니다.");
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.leftSection}>
          <h1 className={styles.title}>마이페이지</h1>
          <p className={styles.greeting}>안녕하세요, {name}님</p>
        </div>
        <div className={styles.rightSection}>
          <Link to={ROUTE_PATH.MYPAGE} className={styles.navLink}>
            내 정보
          </Link>
          <Link to={ROUTE_PATH.MEMBERS} className={styles.navLink}>
            회원 조회
          </Link>
          <button type="button" className={styles.navButton}>
            로그아웃
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={handleDeleteClick}
          >
            회원탈퇴
          </button>
        </div>
      </nav>

      <Modal
        isOpen={isDeleteModalOpen}
        title="정말 탈퇴하시겠어요?"
        message="탈퇴 후에는 모든 정보가 삭제돼요"
        confirmLabel="회원탈퇴"
        onCancel={handleCancel}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default Navigation;
