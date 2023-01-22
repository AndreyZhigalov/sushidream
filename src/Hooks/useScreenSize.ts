import { useState, useEffect } from 'react';

type ScreenProps = {
  width: number ;
  height: number ;
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenProps>({
    width: 0,
    height: 0,
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
