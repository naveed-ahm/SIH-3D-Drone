import React from 'react';
import { X, Shield, Wind, BatteryCharging, Compass, Radio, Activity, CheckCircle2 } from 'lucide-react';
import { DRONE_SPECS } from '../../data/components';

interface SpecificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecificationsModal: React.FC<SpecificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 text-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                AIRCRAFT PLATFORM SPECIFICATION
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED ARCHITECTURE
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              SilentResQ Hybrid VTOL Platform
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Long-range autonomous search-and-rescue UAV combining 4-motor vertical hover with high-efficiency fixed-wing gliding.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Endurance</span>
            <p className="font-mono text-lg font-bold text-white mt-0.5">75 min</p>
            <span className="text-[10px] text-emerald-400 font-mono">Cruise at 22 m/s</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Wingspan</span>
            <p className="font-mono text-lg font-bold text-white mt-0.5">2,400 mm</p>
            <span className="text-[10px] text-sky-400 font-mono">High-aspect ratio</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Search Radius</span>
            <p className="font-mono text-lg font-bold text-white mt-0.5">25 km</p>
            <span className="text-[10px] text-orange-400 font-mono">Encrypted Telemetry</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Max Payload</span>
            <p className="font-mono text-lg font-bold text-white mt-0.5">1.5 kg</p>
            <span className="text-[10px] text-slate-400 font-mono">EO/IR Turret + Kit</span>
          </div>
        </div>

        {/* Detailed Metrics Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 divide-y divide-slate-800/80 overflow-hidden text-xs">
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Airframe Architecture</span>
            <span className="font-semibold text-white">Hybrid Quad-Plane (4x VTOL + 1x Pusher)</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Maximum Takeoff Weight (MTOW)</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.mtow}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Empty Weight (Airframe + Avionics)</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.emptyWeight}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Cruise Speed</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.cruiseSpeed}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Maximum Dash Speed</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.maxSpeed}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Fixed-Wing Stall Speed</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.stallSpeed}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Operational Ceiling</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.operationalCeiling}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Wind Resistance Threshold</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.windResistance}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Primary Power Battery</span>
            <span className="font-mono font-medium text-white">{DRONE_SPECS.powerSystem}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-slate-400">Environmental Protection</span>
            <span className="font-mono font-medium text-emerald-400">{DRONE_SPECS.ingressRating}</span>
          </div>
        </div>

        {/* Operational Mission Summary */}
        <div className="mt-5 p-4 rounded-2xl bg-orange-950/20 border border-orange-500/30 text-xs">
          <p className="font-semibold text-orange-400 mb-1">Humanitarian Search & Rescue Deployment Profile</p>
          <p className="text-slate-300 leading-relaxed">
            SilentResQ takes off vertically from rugged backcountry terrain, ships, or forest clearings with zero runway required. Upon reaching 30 meters AGL, the Cube autopilot engages the forward pusher motor, transitioning all aerodynamic lift onto the 2.4-meter wings. In fixed-wing mode, power consumption drops by 76%, allowing an expansive 25 km emergency search perimeter with active FLIR thermal human body detection.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Specifications
          </button>
        </div>
      </div>
    </div>
  );
};
