import React, { useState } from 'react';
import { 
  X, 
  Rotate3d, 
  RotateCcw, 
  Maximize2, 
  Pause, 
  Play, 
  ShieldCheck, 
  MapPin, 
  Cpu, 
  Layers, 
  Tag, 
  Info,
  ChevronRight
} from 'lucide-react';
import { DroneComponent } from '../../types/drone';
import { Component3DViewer } from '../3d/Component3DViewer';

interface ComponentDetailModalProps {
  component: DroneComponent | null;
  onClose: () => void;
  onSelectComponent: (comp: DroneComponent) => void;
  allComponents: DroneComponent[];
}

export const ComponentDetailModal: React.FC<ComponentDetailModalProps> = ({
  component,
  onClose,
  onSelectComponent,
  allComponents
}) => {
  if (!component) return null;

  const [viewAngle, setViewAngle] = useState<'iso' | 'front' | 'side' | 'top'>('iso');
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[850px] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
              AEROSPACE HARDWARE DETAIL
            </span>
            <span className="text-slate-500">/</span>
            <h2 className="font-display text-lg font-bold text-white tracking-wide">
              {component.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close Detail View"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* LEFT: 3D Interactive Component Canvas (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col p-4 md:p-6 bg-slate-950/80 border-b lg:border-b-0 lg:border-r border-slate-800/80 min-h-[350px]">
            {/* 3D Canvas Box */}
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <Component3DViewer
                component={component}
                viewAngle={viewAngle}
                autoRotate={autoRotate}
              />

              {/* 3D Viewport Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    autoRotate ? 'bg-orange-600 text-white' : 'bg-slate-900 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Rotate3d className="w-3.5 h-3.5 text-orange-400" />}
                  <span>{autoRotate ? 'Pause' : 'Auto'}</span>
                </button>

                <div className="h-4 w-px bg-slate-800" />

                {(['iso', 'front', 'side', 'top'] as const).map((angle) => (
                  <button
                    key={angle}
                    onClick={() => setViewAngle(angle)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium uppercase transition-colors cursor-pointer ${
                      viewAngle === angle
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {angle}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setViewAngle('iso');
                    setAutoRotate(true);
                  }}
                  title="Reset 3D Angle"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                </button>
              </div>

              {/* Helper Badge */}
              <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-400">
                DRAG TO ORBIT · SCROLL TO ZOOM
              </div>
            </div>

            {/* Quick Next/Prev Hardware Switcher */}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Explore other components:</span>
              <div className="flex gap-2">
                {allComponents.slice(0, 4).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectComponent(c)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                      c.id === component.id
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Aerospace Technical Specifications & Integration (5 Cols) */}
          <div className="lg:col-span-5 p-6 overflow-y-auto space-y-5 bg-slate-950">
            {/* Header Meta */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  {component.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {component.status}
                </span>
              </div>
              <h1 className="font-display text-2xl font-bold text-white">
                {component.name}
              </h1>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {component.description}
              </p>
            </div>

            {/* Key Engineering Numbers Grid */}
            <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Quantity</span>
                <p className="font-mono text-base font-bold text-white">{component.quantity} Unit(s)</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Approx. Price</span>
                <p className="font-mono text-sm font-semibold text-emerald-400">{component.approxPrice}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">System Category</span>
                <p className="text-xs font-medium text-slate-200">{component.category}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Dependency</span>
                <p className="text-xs font-medium text-slate-300 truncate" title={component.systemDependency}>
                  {component.systemDependency}
                </p>
              </div>
            </div>

            {/* SilentResQ Integration Role */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wide flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                SilentResQ Platform Integration
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
                {component.integration}
              </p>
            </div>

            {/* Technical Specifications Sheet */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                Engineering Specifications
              </span>
              <div className="rounded-xl border border-slate-800 divide-y divide-slate-800/80 bg-slate-900/40 overflow-hidden text-xs">
                {Object.entries(component.specs).map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between p-2.5">
                    <span className="text-slate-400">{label}</span>
                    <span className="font-mono text-slate-100 font-medium text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation Location */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2 text-xs">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Airframe Installation Zone</span>
                <p className="text-slate-200 mt-0.5 font-medium">{component.installationArea}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
