import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Terminal } from "lucide-react";

interface DeveloperConsoleProps {
  jsonOutput: string;
}

const DeveloperConsole = ({ jsonOutput }: DeveloperConsoleProps) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-t border-fitscan-border-subtle">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-3 flex items-center justify-between text-xs text-muted-foreground hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          <span className="font-medium uppercase tracking-wider">Developer Console</span>
        </div>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {expanded && (
        <div className="px-6 pb-5">
          <div className="rounded-lg bg-fitscan-code-bg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-fitscan-code-muted/20">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-fitscan-success/60" />
                </div>
                <span className="text-[10px] text-fitscan-code-muted ml-2">response.json</span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[10px] text-fitscan-code-muted hover:text-fitscan-code-foreground transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-fitscan-code-foreground overflow-x-auto leading-relaxed">
              <code>
                <span className="text-fitscan-code-muted">{"// FitScan SDK Response\n"}</span>
                <span className="text-fitscan-code-muted">{"// Map to your size chart using:\n"}</span>
                <span className="text-fitscan-code-muted">{"// fitscan.getRecommendedSize(measurements)\n\n"}</span>
                {jsonOutput}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperConsole;
