import { useEffect, useState } from "react";

interface Size {
  windowWidth: number;
  windowHeight: number;
}

const useWindowSize = (viewport?: string | null): Size => {
  const [windowSize, setWindowSize] = useState<Size>({
    windowWidth: viewport === "desktop" ? 768 : 0,
    windowHeight: 0,
  });

  useEffect(() => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }, [viewport]);

  const handleResize = () => {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("load", handleResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
