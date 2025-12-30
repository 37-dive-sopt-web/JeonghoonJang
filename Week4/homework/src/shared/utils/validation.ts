/**
 * 비밀번호 유효성 검사 결과
 */
export interface PasswordValidationResult {
  isValid: boolean;
  message: string | null;
}

/**
 * 비밀번호 유효성 검사
 */
export const validatePassword = (
  password: string,
  confirmPassword: string = ""
): PasswordValidationResult => {
  if (password.length === 0) {
    return { isValid: false, message: null };
  }

  // 1. 8~64자 체크
  if (password.length < 8 || password.length > 64) {
    return { isValid: false, message: "8~64자로 입력해주세요" };
  }

  // 2. 대문자 포함 체크
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: "대문자를 포함해주세요" };
  }

  // 3. 숫자 포함 체크
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: "숫자를 포함해주세요" };
  }

  // 4. 특수문자 포함 체크
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { isValid: false, message: "특수문자를 포함해주세요" };
  }

  // 5. 비밀번호 확인 입력 체크
  if (confirmPassword.length === 0) {
    return { isValid: false, message: "비밀번호를 모두 입력해주세요" };
  }

  return { isValid: true, message: null };
};

/**
 * 비밀번호 일치 여부 확인
 */
export const isPasswordMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * 숫자 유효성 검사
 */
export const isValidNumber = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * 아이디 길이 검사
 */
export const isValidUsernameLength = (username: string): boolean => {
  return username.length > 0 && username.length <= 50;
};

