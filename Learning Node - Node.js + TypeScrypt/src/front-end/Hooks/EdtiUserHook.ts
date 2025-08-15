import { useState, useEffect } from "react";

export const useFadeTransition = (show: boolean, duration: number = 300) =>{
  const [shouldRender, setShouldRender] = useState(show);
  const [transitionClass, setTransitionClass] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (show) {
      setShouldRender(true);
      setTransitionClass("opacity-0 -translate-y-4");
      requestAnimationFrame(() => {
        setTransitionClass("opacity-100 translate-y-0");
      });
    } else {
      setTransitionClass("opacity-0 -translate-y-4");
      timeoutId = setTimeout(() => setShouldRender(false), duration);
    }

    return () => clearTimeout(timeoutId);
  }, [show, duration]);

  return { shouldRender, transitionClass };
}