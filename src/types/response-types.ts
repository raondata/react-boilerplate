export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  tokenType?: 'bearer';
};

export type PagingResponseType<T> = {
  count: number;
  page: number;
  result: T[];
  size: number;
  total: number;
};

export type TokenResponseType = {
  accessToken?: string;
  refreshToken?: string;
};
