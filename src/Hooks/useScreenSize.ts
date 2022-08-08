import { useState, useEffect } from 'react';

type ScreenProps = {
  width: number | undefined;
  height: number | undefined;
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenProps>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  return screenSize;
};

export default useScreenSize;
