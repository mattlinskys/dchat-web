import { useState, useEffect } from "react";

const useWindowActive = () => {
  const [isActive, setActive] = useState(true);

  useEffect(() => {
    const visibilityChangeHandler = () => {
      setActive(!document.hidden);
    };

    window.addEventListener("visibilitychange", visibilityChangeHandler);
    return () => {
      window.removeEventListener("visibilitychange", visibilityChangeHandler);
    };
  }, []);

  return isActive;
};

export default useWindowActive;
