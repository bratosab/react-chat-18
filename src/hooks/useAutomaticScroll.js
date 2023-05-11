import { useEffect, useRef } from "react";

export default function useAutomaticScroll(dependancy) {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [dependancy]);

  return [scrollRef];
}
