/**
 * 토스트 ID 상수들
 * 동일한 ID를 사용하면 중복 토스트가 표시되지 않음
 */

export const TOAST_IDS = {
  // 인증 관련
  TOKEN_EXPIRED: 'auth-token-expired',
  LOGIN_SUCCESS: 'auth-login-success',
  LOGIN_FAILED: 'auth-login-failed',
  LOGIN_INPUT_ERROR: 'auth-login-input-error',

  // API 관련
  API_ERROR: 'api-error',
  NETWORK_ERROR: 'network-error',

  // 일반적인 알림
  SUCCESS: 'general-success',
  ERROR: 'general-error',
  WARNING: 'general-warning',
  INFO: 'general-info',
} as const;

export type ToastId = (typeof TOAST_IDS)[keyof typeof TOAST_IDS];
