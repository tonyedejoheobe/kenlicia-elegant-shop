import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function PageLoader() {
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHide(true), 1400);
    const t2 = setTimeout(() => setShow(false), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-700 ${
        hide ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* ambient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-primary/15 blur-3xl [animation:var(--animate-float)]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-[var(--brown)]/20 blur-3xl [animation:var(--animate-float)] [animation-delay:-2s]" />

      {/* logo with concentric rings */}
      <div className="relative flex h-40 w-40 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-[var(--brown)]/15 [animation:var(--animate-spin-slow)]" />
        <span className="absolute inset-2 rounded-full border border-dashed border-primary/25 [animation:var(--animate-spin-slow)_reverse]" />
        <span className="absolute -inset-4 rounded-full border-2 border-transparent border-t-primary border-r-primary/40 animate-spin" />
        <img
          src={logo}
          alt="Kenliciaastetics"
          className="relative h-28 w-28 object-contain opacity-0 [animation:fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_both] drop-shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        />
      </div>

      <div className="mt-8 flex flex-col items-center opacity-0 [animation:fade-up_0.8s_cubic-bezier(0.22,1,0.36,1)_0.45s_both]">
        <p className="font-serif text-xl tracking-[0.15em] text-foreground">Kenliciaastetics</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-px w-8 bg-[var(--brown)]/40" />
          <p className="font-serif text-[10px] italic tracking-[0.45em] text-[var(--brown)] uppercase">
            Elegance in Everyworld
          </p>
          <span className="h-px w-8 bg-[var(--brown)]/40" />
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-10 h-px w-56 overflow-hidden rounded-full bg-[var(--brown)]/15">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent [animation:loaderbar_1.4s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes loaderbar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
