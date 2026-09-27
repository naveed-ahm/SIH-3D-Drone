import React from 'react';
import { X, RotateCcw, Sliders, Sun, Eye, Layers, Compass, Wind } from 'lucide-react';
import { ViewerSettings } from '../../types/drone';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ViewerSettings;
  onUpdateSettings: (updater: (prev: ViewerSettings) => ViewerSettings) => void;
  onResetDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetDefaults
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-orange-400" />
            <h3 className="font-display text-lg font-bold text-white">
              3D Viewport Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings List */}
        <div className="py-4 space-y-4 text-xs">
          {/* Auto Rotate Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-200 text-sm">360° Auto-Rotate</p>
              <p className="text-slate-400 text-[11px]">Continuously orbit around the aircraft</p>
            </div>
            <button
              onClick={() => onUpdateSettings((p) => ({ ...p, autoRotate: !p.autoRotate }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                settings.autoRotate ? 'bg-orange-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.autoRotate ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Auto-Rotate Speed */}
          {settings.autoRotate && (
            <div className="space-y-1.5 pl-3 border-l-2 border-slate-800">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Rotation Velocity</span>
                <span className="font-mono text-white">{settings.autoRotateSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={settings.autoRotateSpeed}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onUpdateSettings((p) => ({ ...p, autoRotateSpeed: val }));
                }}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          )}

          {/* Reference Grid */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-200 text-sm">Aerospace Reference Grid</p>
              <p className="text-slate-400 text-[11px]">Concentric metric ground rings & compass crosshairs</p>
            </div>
            <button
              onClick={() => onUpdateSettings((p) => ({ ...p, showGrid: !p.showGrid }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                settings.showGrid ? 'bg-orange-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showGrid ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Thrust Vectors */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-200 text-sm">Thrust Vectors & Airflow</p>
              <p className="text-slate-400 text-[11px]">Dynamic VTOL lift cones & cruise propulsion vectors</p>
            </div>
            <button
              onClick={() => onUpdateSettings((p) => ({ ...p, showThrustVectors: !p.showThrustVectors }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                settings.showThrustVectors ? 'bg-orange-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.showThrustVectors ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Propeller Animation */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-200 text-sm">Animate Propeller Rotation</p>
              <p className="text-slate-400 text-[11px]">Spin VTOL and cruise propellers during simulation</p>
            </div>
            <button
              onClick={() => onUpdateSettings((p) => ({ ...p, animatePropellers: !p.animatePropellers }))}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative p-0.5 ${
                settings.animatePropellers ? 'bg-orange-600' : 'bg-slate-800'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.animatePropellers ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Studio Lighting Intensity */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Studio Key & Rim Light Intensity
              </span>
              <span className="font-mono text-white">{Math.round(settings.lightingIntensity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.4"
              max="2.0"
              step="0.1"
              value={settings.lightingIntensity}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onUpdateSettings((p) => ({ ...p, lightingIntensity: val }));
              }}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
