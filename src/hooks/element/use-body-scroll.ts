import { useEffect, useState } from 'react';

const useBodyScroll = (isLock: boolean) => {
  const [scrollLock, setScrollLock] = useState<boolean>(isLock);

  useEffect(() => {
    if (scrollLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollLock]);

  useEffect(() => {
    setScrollLock(isLock);
  }, [isLock]);

  return { setScrollLock };
};

export default useBodyScroll;
