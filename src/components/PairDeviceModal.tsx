import React, { useState } from 'react';

interface PairDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PairDeviceModal: React.FC<PairDeviceModalProps> = ({ isOpen, onClose }) => {
  const [syncCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulatedConnected, setIsSimulatedConnected] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(syncCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-[#fff8f7] rounded-2xl shadow-2xl border border-[#c6c6ce]/40 p-6 text-left relative overflow-hidden animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#45464d] hover:text-[#06102b] p-1"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#be8222]">
          <span className="material-symbols-outlined text-[24px]">devices</span>
          <span className="text-xs font-bold uppercase tracking-wider">Dual-Device Sync</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#06102b]">
          Family Read-Together Mode
        </h3>
        <p className="text-sm text-[#45464d] mt-1 mb-6">
          Pair this laptop/phone with your child's bedside tablet. Turn pages together and watch words softly illuminate in real-time.
        </p>

        {isSimulatedConnected ? (
          <div className="bg-[#fff0ef] border border-[#ffcfcb] rounded-xl p-5 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">check_circle</span>
            </div>
            <h4 className="font-serif font-bold text-[#06102b] text-lg">
              Tablet Connected Successfully!
            </h4>
            <p className="text-xs text-[#45464d]">
              Living Room iPad (Synced • Page 1 • Night-Warmth Zero Blue-Light Active)
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[#06102b] text-white text-sm font-semibold hover:bg-[#1c2541]"
            >
              Start Reading in Sync
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Visual Pairing Card */}
            <div className="bg-[#ffe9e7]/60 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-28 h-28 bg-white p-2 rounded-lg shadow-sm border border-[#c6c6ce]/30 flex flex-col items-center justify-center shrink-0">
                {/* SVG QR Code Simulation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#06102b]">
                  <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                  <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                  <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                  <rect x="40" y="20" width="20" height="10" fill="currentColor" />
                  <rect x="45" y="45" width="25" height="25" fill="currentColor" />
                  <rect x="75" y="75" width="15" height="15" fill="currentColor" />
                </svg>
              </div>

              <div className="text-center sm:text-left flex-1">
                <span className="text-[11px] uppercase tracking-wider text-[#45464d] font-bold">
                  Bedside Pairing PIN
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-2xl font-bold tracking-widest text-[#06102b] bg-white px-3 py-1 rounded-lg border border-[#c6c6ce]/40">
                    {syncCode}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded bg-white hover:bg-[#ffe1df] text-[#06102b] transition-colors"
                    title="Copy code"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isCopied ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
                <p className="text-[11px] text-[#45464d] mt-1.5">
                  Point tablet camera or enter 6-digit PIN in the StoryWeave Companion app.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setIsSimulatedConnected(true)}
                className="w-full py-2.5 rounded-lg bg-[#be8222] hover:bg-[#feb956] text-white hover:text-[#1d0f00] font-semibold text-sm shadow transition-colors"
              >
                Simulate Instant Tablet Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
