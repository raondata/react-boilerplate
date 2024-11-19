export type RestApiType = 'get' | 'put' | 'post' | 'delete';

export type ApiRequestType = {
  type?: RestApiType;
  url: string;
  params?: { [key: string]: any };
};
