import { ApiRequestType } from '@@types/request-types';
import { VITE_API_ENDPOINT } from '@configs/api-config';
import axios from 'axios';
const api = axios.create({
  baseURL: VITE_API_ENDPOINT,
});

const request = async <T>({
  url,
  params,
  type = 'get',
  token,
}: ApiRequestType & { token?: string }) => {
  // setToken(token);

  const $url = url;
  let $params = {};
  // params 전처리
  let $data = {};
  if (type === 'get' || type === 'delete') {
    $params = { ...params };
  } else if (type === 'post' || type === 'put') {
    $data = { ...params };
  }
  return await api.request<T>({
    url: $url,
    method: type,
    params: $params,
    data: $data,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': !token
        ? 'application/x-www-urlencoded'
        : 'application/json',
    },
  });
};

const multipartRequest = async <T>({
  url,
  params,
  token,
}: ApiRequestType & { token?: string }) => {
  return await api.request<T>({
    url,
    method: 'post',
    data: params,
    headers: {
      Authorization: token && `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const loginRequest = async <T>({
  url,
  params,
}: ApiRequestType & { token?: string }) => {
  // setToken(token);

  const $url = url;
  // params 전처리
  let $data = {};

  $data = { ...params };
  const result = await api.request<T>({
    url: $url,
    method: 'post',
    data: $data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return result;
};

export default { request, multipartRequest, loginRequest };
