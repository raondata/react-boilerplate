import { createContext } from 'react';

interface ApiContextType {
  isMeLoaded: boolean;
  meData: any;
  refetchMe: () => void;
  logout: () => void;
}

const ApiContext = createContext<ApiContextType>({
  isMeLoaded: false,
  meData: null,
  refetchMe: () => {},
  logout: () => {},
});

export default ApiContext;
