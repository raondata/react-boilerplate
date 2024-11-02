import { useSearchParams } from 'react-router-dom';

const useToken = () => {
  const [useSearchParam] = useSearchParams();
  const token = useSearchParam.get('token') || '';

  return token;
};

export default useToken;
