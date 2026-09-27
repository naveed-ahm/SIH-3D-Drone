import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Maximize2, 
  Minimize2, 
  Settings, 
  Layers, 
  Radio, 
  BatteryMedium, 
  Compass, 
  Wind,
  Info
} from 'lucide-react';
import { FlightMode } from '../../types/drone';

interface HeaderProps {
  flightMode: FlightMode;
  onSelectFlightMode: (mode: FlightMode) => void;
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  onOpenSpecs: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  flightMode,
  onSelectFlightMode,
  onToggleSidebar,
  onOpenSettings,
  onOpenSpecs
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  return (
    <header className="relative z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white select-none">
      {/* Zone 1: Left Brand & Hamburger Menu */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg md:text-xl font-bold tracking-wider text-white">
              Silent<span className="text-orange-500">ResQ</span>
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
              VTOL RESCUE
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium tracking-tight">
            Hybrid VTOL Fixed-Wing Rescue Drone Viewer
          </span>
        </div>
      </div>

      {/* Zone 2: Flight Mode Selector & Telemetry HUD */}
      <div className="hidden lg:flex items-center gap-6">
        {/* Mode Selector */}
        <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800">
          {(['VTOL', 'TRANSITION', 'CRUISE'] as FlightMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSelectFlightMode(mode)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                flightMode === mode
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Telemetry HUD (Simulated) */}
        <div className="flex items-center gap-4 text-xs font-mono bg-slate-900/80 px-3.5 py-1.5 rounded-lg border border-slate-800 text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-200 font-semibold">SIMULATION</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5" title="Airspeed">
            <Wind className="w-3.5 h-3.5 text-sky-400" />
            <span>
              {flightMode === 'VTOL' ? '0.0 m/s' : flightMode === 'TRANSITION' ? '14.2 m/s' : '22.0 m/s'}
            </span>
          </div>
          <div className="flex items-center gap-1.5" title="Altitude">
            <Compass className="w-3.5 h-3.5 text-orange-400" />
            <span>{flightMode === 'VTOL' ? 'ALT 15m' : 'ALT 120m'}</span>
          </div>
          <div className="flex items-center gap-1.5" title="GPS Constellation Status">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>3D FIX (18)</span>
          </div>
          <div className="flex items-center gap-1.5" title="Main LiPo Battery">
            <BatteryMedium className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-200 font-semibold">98% (24.8V)</span>
          </div>
        </div>
      </div>

      {/* Zone 3: Actions (Fullscreen, Specs, Settings) */}
      <div className="flex items-center gap-2">
        {/* Mobile Mode Switcher */}
        <div className="flex lg:hidden items-center p-0.5 bg-slate-900 rounded-md border border-slate-800">
          {(['VTOL', 'CRUISE'] as FlightMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onSelectFlightMode(mode)}
              className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors ${
                flightMode === mode
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <button
          onClick={onOpenSpecs}
          title="Drone Specifications"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
        >
          <Info className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">Specs</span>
        </button>

        <button
          onClick={onOpenSettings}
          title="Display & Scene Settings"
          aria-label="Display & Scene Settings"
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 text-orange-400" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
