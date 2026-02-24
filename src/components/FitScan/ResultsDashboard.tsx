import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RotateCcw, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { MeasurementData } from "./FitScanWidget";
import DeveloperConsole from "./DeveloperConsole";

interface ResultsDashboardProps {
  measurements: MeasurementData;
  onReset: () => void;
}

const Mannequin = () => {
  return (
    <group>
      {/* Head */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.1, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.15, 0.18, 0.6, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Hips */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.18, 0.14, 0.1, 8]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.25, 1.25, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.035, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.25, 1.25, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.035, 0.03, 0.5, 8]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.08, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.045, 0.7, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.08, 0.4, 0]}>
        <cylinderGeometry args={[0.06, 0.045, 0.7, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Measurement rings */}
      <mesh position={[0, 1.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.17, 0.005, 8, 32]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.005, 8, 32]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.17, 0.005, 8, 32]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const measurementLabels: Record<keyof MeasurementData, string> = {
  chest: "Chest",
  waist: "Waist",
  hips: "Hips",
  inseam: "Inseam",
  shoulders: "Shoulders",
  height: "Height",
};

const ResultsDashboard = ({ measurements, onReset }: ResultsDashboardProps) => {
  const [copied, setCopied] = useState(false);

  const jsonOutput = JSON.stringify(measurements, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col">
      {/* Main content - two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0">
        {/* 3D Mannequin */}
        <div className="bg-fitscan-scanner-bg aspect-square md:aspect-auto md:min-h-[360px] relative">
          <Canvas camera={{ position: [0, 1, 2.2], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 3, 1]} intensity={1} />
            <pointLight position={[-2, 2, 2]} intensity={0.3} />
            <Mannequin />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate
              autoRotateSpeed={1.5}
            />
          </Canvas>
          <div className="absolute bottom-3 left-3 text-[10px] text-fitscan-scanner-overlay/40 uppercase tracking-wider">
            3D Preview — Drag to rotate
          </div>
        </div>

        {/* Measurements */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">Body Profile</h3>
              <p className="text-xs text-muted-foreground">Estimated measurements</p>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-fitscan-success/10 text-fitscan-success text-[11px] font-medium">
              ✓ Complete
            </div>
          </div>

          <div className="space-y-0">
            {(Object.keys(measurements) as (keyof MeasurementData)[]).map((key, i) => (
              <div
                key={key}
                className={`flex items-center justify-between py-3 ${
                  i < Object.keys(measurements).length - 1 ? "border-b border-fitscan-border-subtle" : ""
                }`}
              >
                <span className="text-sm text-muted-foreground">{measurementLabels[key]}</span>
                <span className="text-sm font-semibold text-foreground font-display">{measurements[key]}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onReset}
            className="mt-5 w-full h-10 rounded-lg border border-input text-sm font-medium text-muted-foreground flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Scan Again
          </button>
        </div>
      </div>

      {/* Developer Console */}
      <DeveloperConsole jsonOutput={jsonOutput} />
    </div>
  );
};

export default ResultsDashboard;
