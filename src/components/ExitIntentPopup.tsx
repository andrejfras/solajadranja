"use client";

import { useState, useEffect, useRef } from "react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem("exitPopupDismissed")) {
      setClosed(true);
      return;
    }

    // Wait 30 seconds before arming the exit intent
    const timer = setTimeout(() => {
      readyRef.current = true;
    }, 30000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && readyRef.current && !closed) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [closed]);

  const dismiss = () => {
    setShow(false);
    setClosed(true);
    sessionStorage.setItem("exitPopupDismissed", "1");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-md shadow-2xl w-full max-w-lg overflow-hidden flex flex-col sm:flex-row">
        {/* Cover image area */}
        <div className="bg-sand sm:w-2/5 p-6 flex flex-col justify-center items-center text-center border-b sm:border-b-0 sm:border-r border-slate-100 relative">
          <div className="w-16 h-16 bg-navy text-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="font-display text-navy text-lg leading-tight mb-2">Brezplačen e-priročnik</p>
          <p className="text-coral text-[10px] uppercase tracking-widest font-bold">PDF Prenos</p>
        </div>

        {/* Content area */}
        <div className="p-8 sm:w-3/5">
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 text-slate-400 hover:text-navy transition-colors text-2xl font-light"
          >
            &times;
          </button>

          <h3 className="text-2xl font-display text-navy mb-2">Preden greste...</h3>
          <p className="text-slate-500 text-sm font-light leading-relaxed mb-6">
            Prejmite ekskluziven vodnik <span className="font-medium text-navy">&quot;10 stvari, ki se jih morate naučiti pred prvim samostojnim najemom&quot;</span> in preprečite drage začetniške napake na morju.
          </p>

          <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); dismiss(); }}>
            <input
              type="email"
              placeholder="Vnesite svoj e-naslov"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm text-sm focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 px-4 bg-navy hover:bg-coral text-white text-xs font-medium uppercase tracking-widest rounded-sm transition-colors"
            >
              Pošlji mi strokovne nasvete
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-4 text-center">Brez neželene pošte. Odjavite se lahko kadarkoli.</p>
        </div>
      </div>
    </div>
  );
}
