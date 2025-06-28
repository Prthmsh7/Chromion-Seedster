import React, { useState, useEffect } from 'react';
import { Scene3DCanvas } from './components/3d/Scene3D';
import CoinCard from './components/CoinCard';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLDivElement>(".card");

    const handlePointerMove = (e: PointerEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    document
      .querySelector<HTMLDivElement>("[data-grid]")
      ?.addEventListener("pointermove", handlePointerMove);

    return () => {
      document
        .querySelector<HTMLDivElement>("[data-grid]")
        ?.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#0c0c0c] select-none background">
      <div className="container p-5 pb-20 mx-auto">
        <div className="relative mt-5 overflow-hidden">
          <div
            className="grid h-full gap-5 overflow-hidden group grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            data-grid
          >
            <CoinCard />
          </div>

          <Scene3DCanvas />
        </div>
      </div>
    </div>
  );
}

export default App;