import React from 'react';
import { 
  RotateCcw, 
  Rotate3d, 
  Pause, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Box,
  Compass
} from 'lucide-react';
import { CameraViewPreset, ViewerSettings } from '../../types/drone';

interface ControlBarProps {
  activeView: CameraViewPreset | null;
  onSelectView: (view: CameraViewPreset) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetCamera: () => void;
  settings: ViewerSettings;
  onUpdateSettings: (updater: (prev: ViewerSettings) => ViewerSettings) => void;
  isExploded: boolean;
  onToggleExploded: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  activeView,
  onSelectView,
  autoRotate,
  onToggleAutoRotate,
  onZoomIn,
  onZoomOut,
  onResetCamera,
  settings,
  onUpdateSettings,
  isExploded,
  onToggleExploded
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 max-w-[96vw] overflow-x-auto select-none p-1.5 bg-slate-950/95 backdrop-blur-2xl border border-sky-500/30 rounded-2xl shadow-2xl shadow-slate-950/80 flex items-center gap-1.5 md:gap-2 scrollbar-none">
      {/* 1. PROMINENT COMPONENT / EXPLODED VIEW BUTTON */}
      <button
        onClick={onToggleExploded}
        title={isExploded ? 'Return to Assembled Drone View' : 'Animate Drone into 3D Exploded Component View'}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
          isExploded
            ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/40 ring-2 ring-sky-300'
            : 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/50 hover:border-sky-300 shadow-md shadow-sky-950/40'
        }`}
      >
        <Layers className={`w-3.5 h-3.5 ${isExploded ? 'text-slate-950' : 'text-sky-400'}`} />
        <span>{isExploded ? 'COMPONENT VIEW' : 'COMPONENT'}</span>
      </button>

      {/* Assembled View / Reset Components Button (Visible when Exploded Mode is Active) */}
      {isExploded && (
        <button
          onClick={onToggleExploded}
          title="Smoothly bring every component back to original assembled position"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer whitespace-nowrap animate-in fade-in duration-150"
        >
          <RotateCcw className="w-3 h-3 text-orange-400" />
          <span>Assembled View</span>
        </button>
      )}

      <div className="h-5 w-px bg-slate-800 shrink-0" />

      {/* 2. 360 Auto-Rotate / Pause Button */}
      <button
        onClick={onToggleAutoRotate}
        title={autoRotate ? 'Pause 360° Rotation' : 'Start 360° Auto-Rotate'}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
          autoRotate
            ? 'bg-orange-600 text-white shadow-md shadow-orange-900/40 ring-1 ring-orange-400'
            : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
        }`}
      >
        {autoRotate ? (
          <>
            <Pause className="w-3.5 h-3.5 text-white" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Rotate3d className="w-3.5 h-3.5 text-orange-400" />
            <span>360° Rotate</span>
          </>
        )}
      </button>

      <div className="h-5 w-px bg-slate-800 shrink-0" />

      {/* 3. Preset Camera Views */}
      <div className="flex items-center gap-1">
        {[
          { id: 'front', label: 'Front' },
          { id: 'top', label: 'Top' },
          { id: 'left', label: 'Left' },
          { id: 'right', label: 'Right' },
          { id: 'rear', label: 'Rear' },
          { id: 'bottom', label: 'Bottom' },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => onSelectView(view.id as CameraViewPreset)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeView === view.id
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      <div className="h-5 w-px bg-slate-800 shrink-0" />

      {/* 4. Reset View Button */}
      <button
        onClick={onResetCamera}
        title="Reset to Hero 3/4 Perspective"
        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
      >
        <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
        <span>Reset</span>
      </button>

      <div className="h-5 w-px bg-slate-800 shrink-0" />

      {/* 5. Zoom Controls */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={onZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <ZoomIn className="w-4 h-4 text-sky-400" />
        </button>
        <button
          onClick={onZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          <ZoomOut className="w-4 h-4 text-sky-400" />
        </button>
      </div>

      <div className="h-5 w-px bg-slate-800 shrink-0" />

      {/* 6. Wireframe Quick Toggle */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onUpdateSettings((prev) => ({ ...prev, wireframeMode: !prev.wireframeMode }))}
          title={settings.wireframeMode ? 'Shaded Mode' : 'Wireframe / Inspection Mode'}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            settings.wireframeMode
              ? 'bg-orange-500/20 text-orange-400 border border-orange-400/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Box className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
