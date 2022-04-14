import React, { createContext, useContext, useEffect, useState } from 'react';

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const SizeContext = createContext(getSize());

export const SizeProvider: React.FC = ({ children }) => {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const onResize = () => setWindowSize(getSize);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <SizeContext.Provider value={windowSize}>{children}</SizeContext.Provider>
  );
};

export const useSize = () => useContext(SizeContext);
