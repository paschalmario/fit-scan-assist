import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OnboardingScreen from "./OnboardingScreen";
import ScannerInterface from "./ScannerInterface";
import ResultsDashboard from "./ResultsDashboard";

export type ScanStep = "onboarding" | "scanning" | "results";

export interface MeasurementData {
  chest: string;
  waist: string;
  hips: string;
  inseam: string;
  shoulders: string;
  height: string;
}

const FitScanWidget = () => {
  const [step, setStep] = useState<ScanStep>("onboarding");
  const [userHeight, setUserHeight] = useState("");
  const [measurements, setMeasurements] = useState<MeasurementData>({
    chest: "96cm",
    waist: "82cm",
    hips: "94cm",
    inseam: "81cm",
    shoulders: "46cm",
    height: "178cm",
  });

  const handleStartScan = (height: string) => {
    setUserHeight(height);
    setMeasurements((prev) => ({ ...prev, height: height + "cm" }));
    setStep("scanning");
  };

  const handleCapture = () => {
    setStep("results");
  };

  const handleReset = () => {
    setStep("onboarding");
    setUserHeight("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border border-fitscan-border-subtle bg-fitscan-surface shadow-2xl shadow-foreground/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-fitscan-border-subtle">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold tracking-tight text-foreground">FitScan</h2>
              <p className="text-[11px] text-muted-foreground tracking-wide uppercase">Virtual Size Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {(["onboarding", "scanning", "results"] as ScanStep[]).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step === s ? "w-6 bg-primary" : i < ["onboarding", "scanning", "results"].indexOf(step) ? "w-3 bg-primary/40" : "w-3 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative min-h-[520px]">
          <AnimatePresence mode="wait">
            {step === "onboarding" && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <OnboardingScreen onStart={handleStartScan} />
              </motion.div>
            )}
            {step === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ScannerInterface onCapture={handleCapture} onBack={() => setStep("onboarding")} />
              </motion.div>
            )}
            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ResultsDashboard measurements={measurements} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FitScanWidget;
