import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Eye, 
  RotateCcw, 
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Info
} from 'lucide-react';
import { DroneComponent } from '../../types/drone';
import { ComponentThumbnail } from './ComponentThumbnail';

interface ComponentInfoCardProps {
  component: DroneComponent | null;
  partName?: string | null;
  isIsolated: boolean;
  isExploded?: boolean;
  onClose: () => void;
  onOpenDetails: (component: DroneComponent) => void;
  onToggleIsolate: () => void;
  onResetSelection: () => void;
}

export const ComponentInfoCard: React.FC<ComponentInfoCardProps> = ({
  component,
  partName,
  isIsolated,
  isExploded,
  onClose,
  onOpenDetails,
  onToggleIsolate,
  onResetSelection
}) => {
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(false);

  if (!component) return null;

  // Exact price formatting: show project price if available, else "Price: To be confirmed"
  const approxPriceDisplay = component.approxPrice && component.approxPrice.trim().length > 0
    ? component.approxPrice
    : 'Price: To be confirmed';

  const specsEntries = component.specs ? Object.entries(component.specs) : [];

  return (
    <aside 
      aria-label="Component Technical Specification Panel"
      className={`fixed z-30 flex flex-col bg-slate-950/95 backdrop-blur-2xl border border-sky-500/35 rounded-2xl shadow-2xl shadow-slate-950/90 text-slate-200 select-none transition-all duration-200 ease-out
        /* Desktop: clean side panel on the right so the drone remains visible */
        md:top-20 md:right-6 md:bottom-auto md:left-auto md:w-[400px] lg:w-[430px] md:max-h-[calc(100vh-140px)]
        /* Mobile: clean bottom sheet / drawer collapsible so the drone above is fully visible */
        bottom-20 left-3 right-3 ${isMobileCollapsed ? 'max-h-[64px]' : 'max-h-[50vh] sm:max-h-[55vh]'}`}
    >
      {/* 1. Header with Category, Status, Inspecting Subpart, and Actions */}
      <div className="p-3.5 pb-2.5 border-b border-slate-800/80 bg-slate-900/70 rounded-t-2xl shrink-0">
        <div className="flex items-start justify-between gap-2.5">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30 uppercase">
                {component.category}
              </span>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {component.status || 'Verified'}
              </span>
              {isExploded && (
                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  EXPLODED
                </span>
              )}
            </div>

            {/* Exact Component Name */}
            <h2 className="font-display text-base sm:text-lg font-bold text-white leading-snug mt-1 truncate">
              {component.name}
            </h2>

            {/* If a specific subpart was clicked (e.g. Front-Left Motor, Port Wing) */}
            {partName && partName !== component.name && (
              <div className="text-[11px] font-mono text-sky-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="truncate">
                  Clicked: <strong className="text-white font-medium">{partName}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Mobile Collapse Toggle & Close Button */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Mobile collapse button */}
            <button
              onClick={() => setIsMobileCollapsed((prev) => !prev)}
              className="md:hidden p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMobileCollapsed ? 'Expand panel' : 'Collapse panel'}
              aria-label={isMobileCollapsed ? 'Expand component panel' : 'Collapse component panel'}
            >
              {isMobileCollapsed ? <ChevronUp className="w-4 h-4 text-sky-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Clear Close Button */}
            <button
              onClick={onClose}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
              title="Close detail panel and deselect"
              aria-label="Close component panel"
            >
              <X className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">CLOSE</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Body Content (Hidden on mobile when collapsed) */}
      {!isMobileCollapsed && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {/* Real Component Image / Visual Schematic Thumbnail */}
            <ComponentThumbnail component={component} className="w-full h-28" />

            {/* Quantity & Approx Price Grid */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold font-mono tracking-wider">
                  QUANTITY
                </span>
                <p className="font-mono text-base font-bold text-white mt-0.5">
                  {component.quantity}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold font-mono tracking-wider">
                  APPROX. PRICE
                </span>
                <p className="font-mono text-xs font-semibold text-emerald-400 mt-0.5 leading-snug">
                  {approxPriceDisplay}
                </p>
              </div>
            </div>

            {/* Role / Function */}
            <div>
              <span className="text-[10px] text-sky-400 uppercase font-bold font-mono tracking-wider">
                ROLE / FUNCTION
              </span>
              <p className="text-slate-200 font-medium mt-1 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                {component.role}
              </p>
            </div>

            {/* SilentResQ Integration */}
            <div>
              <span className="text-[10px] text-orange-400 uppercase font-bold font-mono tracking-wider">
                SILENTRESQ INTEGRATION
              </span>
              <p className="text-slate-300 mt-1 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                {component.integration}
              </p>
            </div>

            {/* Why Required / Used */}
            <div>
              <span className="text-[10px] text-emerald-400 uppercase font-bold font-mono tracking-wider">
                WHY IT IS REQUIRED
              </span>
              <p className="text-slate-300 mt-1 leading-relaxed bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                {component.purpose || component.description || 'Essential flight component required for aircraft stability and mission safety.'}
              </p>
            </div>

            {/* Verified Specifications from Project Data */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold font-mono tracking-wider">
                  KEY SPECIFICATIONS
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  VERIFIED DATA
                </span>
              </div>
              {specsEntries.length > 0 ? (
                <div className="divide-y divide-slate-800/80 bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden">
                  {specsEntries.map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between px-3 py-2 text-[11px]">
                      <span className="text-slate-400 font-mono">{key}</span>
                      <span className="text-slate-200 font-medium font-mono text-right ml-2">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-xs italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                  Specification not provided
                </p>
              )}
            </div>
          </div>

          {/* 3. Panel Action Footer */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/80 rounded-b-2xl grid grid-cols-3 gap-2 shrink-0">
            <button
              onClick={() => onOpenDetails(component)}
              className="col-span-1 py-2 px-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-950/40"
              title="Open full interactive 3D component detail inspector"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>3D Inspector</span>
            </button>

            <button
              onClick={onToggleIsolate}
              className={`col-span-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border ${
                isIsolated
                  ? 'bg-sky-500 text-slate-950 font-bold border-sky-400 shadow-md'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700/80'
              }`}
              title={isIsolated ? 'Restore all components' : 'Isolate this component in 3D'}
            >
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>{isIsolated ? 'Exit Isolate' : 'Isolate'}</span>
            </button>

            <button
              onClick={onResetSelection}
              className="col-span-1 py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Deselect component and restore view"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Deselect</span>
            </button>
          </div>
        </>
      )}
    </aside>
  );
};
