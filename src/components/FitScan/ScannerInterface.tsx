import { useState, useEffect } from "react";
import { ArrowLeft, Camera } from "lucide-react";

interface ScannerInterfaceProps {
  onCapture: () => void;
  onBack: () => void;
}

const ScannerInterface = ({ onCapture, onBack }: ScannerInterfaceProps) => {
  const [isReady, setIsReady] = useState(false);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleCapture = () => {
    setCapturing(true);
    setTimeout(() => onCapture(), 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Scanner viewport */}
      <div className="relative bg-fitscan-scanner-bg aspect-[3/4] max-h-[420px] overflow-hidden">
        {/* Simulated camera feed - gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-fitscan-scanner-bg via-foreground/5 to-fitscan-scanner-bg" />

        {/* Corner brackets */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 400" fill="none">
          {/* Top-left */}
          <path d="M60 40 H40 V60" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Top-right */}
          <path d="M240 40 H260 V60" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Bottom-left */}
          <path d="M60 360 H40 V340" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Bottom-right */}
          <path d="M240 360 H260 V340" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>

        {/* Silhouette overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="120" height="280" viewBox="0 0 120 280" fill="none" className="opacity-30">
            {/* Head */}
            <ellipse cx="60" cy="30" rx="20" ry="25" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Neck */}
            <line x1="60" y1="55" x2="60" y2="70" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Shoulders */}
            <line x1="25" y1="75" x2="95" y2="75" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Torso */}
            <path d="M25 75 L20 160 L40 165 L60 168 L80 165 L100 160 L95 75" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Left leg */}
            <path d="M40 165 L35 280" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Right leg */}
            <path d="M80 165 L85 280" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Left arm */}
            <path d="M25 75 L10 170" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Right arm */}
            <path d="M95 75 L110 170" stroke="hsl(var(--fitscan-scanner-overlay))" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
        </div>

        {/* Scanning line */}
        {isReady && !capturing && (
          <div className="absolute left-[15%] right-[15%] h-[1px] animate-scan-line">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-fitscan-scanner-overlay/60 to-transparent" />
          </div>
        )}

        {/* Flash effect */}
        {capturing && (
          <div className="absolute inset-0 bg-fitscan-scanner-overlay/20 animate-pulse" />
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-fitscan-scanner-bg/60 backdrop-blur-sm flex items-center justify-center text-fitscan-scanner-overlay/80 hover:bg-fitscan-scanner-bg/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Status */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isReady ? "bg-fitscan-success" : "bg-muted-foreground"}`} />
          <span className="text-[11px] text-fitscan-scanner-overlay/70 font-medium">
            {capturing ? "Processing..." : isReady ? "Ready" : "Initializing..."}
          </span>
        </div>

        {/* Guide text */}
        <div className="absolute bottom-16 inset-x-0 text-center">
          <p className="text-xs text-fitscan-scanner-overlay/60">
            {capturing ? "Hold still..." : "Align yourself within the silhouette"}
          </p>
        </div>
      </div>

      {/* Capture controls */}
      <div className="px-6 py-5 flex items-center justify-center bg-fitscan-surface">
        <button
          onClick={handleCapture}
          disabled={!isReady || capturing}
          className="relative w-16 h-16 rounded-full border-[3px] border-primary flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed group"
        >
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center transition-all group-hover:bg-primary/90">
            <Camera className="w-5 h-5 text-primary-foreground" />
          </div>
          {isReady && !capturing && (
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-ring" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ScannerInterface;
