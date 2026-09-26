import React from 'react';

interface FellowshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockAll: () => void;
}

export const FellowshipModal: React.FC<FellowshipModalProps> = ({
  isOpen,
  onClose,
  onUnlockAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-[#fff8f7] rounded-2xl shadow-2xl border border-[#c6c6ce]/40 p-6 text-center relative overflow-hidden animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#45464d] hover:text-[#06102b] p-1"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="w-14 h-14 rounded-full bg-[#1c2541] text-[#feb956] mx-auto flex items-center justify-center mb-4 shadow-md">
          <span className="material-symbols-outlined text-[28px]">key</span>
        </div>

        <span className="text-[11px] uppercase tracking-widest text-[#be8222] font-bold">
          Scholastic Fellowship
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#06102b] mt-1">
          Unlock the Complete Grimoire
        </h3>
        <p className="text-sm text-[#45464d] mt-2 mb-6">
          Access all 3 chapters of <em>The Clockwork Alchemist of Prague</em>, Stephen Fry’s complete 28-minute voice dramatization, and printable cartography.
        </p>

        <div className="space-y-2 text-left bg-[#ffe9e7]/50 p-4 rounded-xl mb-6 text-xs text-[#06102b]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#be8222] text-[16px]">check_circle</span>
            <span>Unlocks Chapter 2: Mercury, Brass, and Stolen Starlight</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#be8222] text-[16px]">check_circle</span>
            <span>Unlocks Chapter 3: The Golem's Last Pendulum</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#be8222] text-[16px]">check_circle</span>
            <span>High-Master Studio Audio with Stephen Fry</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#be8222] text-[16px]">check_circle</span>
            <span>Ad-free, 100% fine-press vellum layout</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              onUnlockAll();
              onClose();
            }}
            className="w-full py-3 rounded-lg bg-[#be8222] hover:bg-[#feb956] text-white hover:text-[#1d0f00] font-bold text-sm shadow-md transition-colors"
          >
            Activate Complimentary Pass (Unlock Now)
          </button>
          <button
            onClick={onClose}
            className="text-xs text-[#45464d] hover:text-[#06102b] py-1 font-medium"
          >
            Continue as Guest Reader
          </button>
        </div>
      </div>
    </div>
  );
};
