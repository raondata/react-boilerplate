export type AuthResponseType = {
  access_token: string;
  refresh_token: string;
  token_type?: 'bearer';
};

export type PagingResponseType<T> = {
  count: number;
  page: number;
  result: T[];
  size: number;
  total: number;
};
