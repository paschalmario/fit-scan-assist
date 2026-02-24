import { useState } from "react";
import { Shield, Ruler, ArrowRight } from "lucide-react";

interface OnboardingScreenProps {
  onStart: (height: string) => void;
}

const OnboardingScreen = ({ onStart }: OnboardingScreenProps) => {
  const [height, setHeight] = useState("");

  return (
    <div className="p-8 flex flex-col items-center text-center">
      {/* Hero */}
      <div className="mb-8 mt-4">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-foreground">
            <path d="M12 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 10v10M8 14h8M9 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground mb-2">
          Find Your Perfect Fit
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          Get accurate body measurements in seconds using your camera. No tape measure needed.
        </p>
      </div>

      {/* Height Input */}
      <div className="w-full max-w-xs mb-6">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block text-left">
          Your Height (cm)
        </label>
        <div className="relative">
          <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="number"
            placeholder="e.g. 178"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-input bg-fitscan-surface-elevated text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Features */}
      <div className="w-full max-w-xs grid grid-cols-2 gap-3 mb-8">
        {[
          { icon: "⚡", label: "30-second scan" },
          { icon: "🎯", label: "±1cm accuracy" },
          { icon: "🔒", label: "Local processing" },
          { icon: "📏", label: "5 measurements" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-secondary/60 text-xs text-muted-foreground">
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => height && onStart(height)}
        disabled={!height}
        className="w-full max-w-xs h-12 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Start Scan
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Privacy */}
      <div className="flex items-center gap-1.5 mt-4 text-[11px] text-muted-foreground/70">
        <Shield className="w-3 h-3" />
        <span>Your image is processed locally and never stored</span>
      </div>
    </div>
  );
};

export default OnboardingScreen;
