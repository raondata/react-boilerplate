import { useEffect, useState } from 'react';

const useDevice = () => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>();

  useEffect(() => {
    const device = navigator.userAgent.toLocaleLowerCase();
    if (device.indexOf('android') > -1) {
      //안드로이드
      setPlatform('android');
    } else if (
      device.indexOf('iphone') > -1 ||
      device.indexOf('ipad') > -1 ||
      device.indexOf('ipod') > -1
    ) {
      //IOS
      setPlatform('ios');
    } else {
      //아이폰, 안드로이드 외
      setPlatform('other');
    }
  }, []);

  return { platform };
};

export default useDevice;
