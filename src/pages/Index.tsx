import FitScanWidget from "@/components/FitScan/FitScanWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2">SDK Preview</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">FitScan Widget</h1>
          <p className="text-sm text-muted-foreground mt-2">Embeddable virtual size assistant for fashion retailers</p>
        </div>
        <FitScanWidget />
      </div>
    </div>
  );
};

export default Index;
