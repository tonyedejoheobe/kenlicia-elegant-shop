import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 900);
    const t2 = setTimeout(() => setShow(false), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-[var(--brown)]/15" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/40" />
        <img src={logo} alt="Kenliciaastetics" className="h-16 w-auto animate-pulse" />
      </div>
      <p className="mt-6 font-serif text-sm italic tracking-[0.35em] text-[var(--brown)] uppercase">
        Elegance in Everyworld
      </p>
    </div>
  );
}
