import { useEffect } from "react";
export const useResizeListener = (onResize: () => void, deps: any[] = []) => {
  useEffect(() => {
    window.addEventListener("resize", () => onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize, ...deps]);
};
