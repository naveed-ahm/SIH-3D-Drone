import React, { useState, useEffect } from 'react';
import { DroneComponent } from '../../types/drone';
import { ComponentSvgIllustration } from './ComponentIllustrations';
import { Maximize2, X, CheckCircle2 } from 'lucide-react';

interface ComponentThumbnailProps {
  component: DroneComponent;
  className?: string;
  allowZoom?: boolean;
}

// Canonical mapping of component ID -> exact component image path
export const COMPONENT_IMAGE_MAP: Record<string, string[]> = {
  vtol_motor: [
    '/images/components/vtol-motor.jpg',
    '/images/components/vtol-motor.png',
    '/images/components/vtol-motor.svg'
  ],
  vtol_propeller: [
    '/images/components/vtol-propeller.jpg',
    '/images/components/vtol-propeller.png',
    '/images/components/vtol-propeller.svg'
  ],
  vtol_esc: [
    '/images/components/vtol-esc.jpg',
    '/images/components/vtol-esc.png',
    '/images/components/vtol-esc.svg'
  ],
  cruise_motor: [
    '/images/components/cruise-motor.jpg',
    '/images/components/cruise-motor.png',
    '/images/components/cruise-motor.svg'
  ],
  cruise_propeller: [
    '/images/components/cruise-propeller.jpg',
    '/images/components/cruise-propeller.png',
    '/images/components/cruise-propeller.svg'
  ],
  cruise_esc: [
    '/images/components/cruise-esc.jpg',
    '/images/components/cruise-esc.png',
    '/images/components/cruise-esc.svg'
  ],
  flight_controller: [
    '/images/components/flight-controller.jpg',
    '/images/components/flight-controller.png',
    '/images/components/flight-controller.svg'
  ],
  gps_compass: [
    '/images/components/gps-compass.jpg',
    '/images/components/gps-compass.png',
    '/images/components/gps-compass.svg'
  ],
  pitot_airspeed: [
    '/images/components/pitot-airspeed.jpg',
    '/images/components/pitot-airspeed.png',
    '/images/components/pitot-airspeed.svg'
  ],
  camera_gimbal: [
    '/images/components/camera-gimbal.jpg',
    '/images/components/camera-gimbal.png',
    '/images/components/camera-gimbal.svg'
  ],
  battery: [
    '/images/components/battery.jpg',
    '/images/components/battery.png',
    '/images/components/battery.svg'
  ],
  servo: [
    '/images/components/servo.jpg',
    '/images/components/servo.png',
    '/images/components/servo.svg'
  ],
  telemetry: [
    '/images/components/telemetry.jpg',
    '/images/components/telemetry.png',
    '/images/components/telemetry.svg'
  ],
  fuselage: [
    '/images/components/fuselage.jpg',
    '/images/components/fuselage.png',
    '/images/components/fuselage.svg'
  ],
  left_wing: [
    '/images/components/left-wing.jpg',
    '/images/components/left-wing.png',
    '/images/components/left-wing.svg'
  ],
  right_wing: [
    '/images/components/right-wing.jpg',
    '/images/components/right-wing.png',
    '/images/components/right-wing.svg'
  ],
  landing_gear: [
    '/images/components/landing-gear.jpg',
    '/images/components/landing-gear.png',
    '/images/components/landing-gear.svg'
  ],
  barometer: [
    '/images/components/barometer.jpg',
    '/images/components/barometer.png',
    '/images/components/barometer.svg'
  ],
  rc_receiver: [
    '/images/components/rc-receiver.jpg',
    '/images/components/rc-receiver.png',
    '/images/components/rc-receiver.svg'
  ],
  power_module: [
    '/images/components/power-module.jpg',
    '/images/components/power-module.png',
    '/images/components/power-module.svg'
  ],
  pdb: [
    '/images/components/pdb.jpg',
    '/images/components/pdb.png',
    '/images/components/pdb.svg'
  ],
  bec: [
    '/images/components/bec.jpg',
    '/images/components/bec.png',
    '/images/components/bec.svg'
  ],
  wiring: [
    '/images/components/wiring.jpg',
    '/images/components/wiring.png',
    '/images/components/wiring.svg'
  ],
  airframe: [
    '/images/components/airframe.jpg',
    '/images/components/airframe.png',
    '/images/components/airframe.svg'
  ]
};

export const ComponentThumbnail: React.FC<ComponentThumbnailProps> = ({ 
  component, 
  className = 'w-full h-36',
  allowZoom = true
}) => {
  const [activeBitmapSrc, setActiveBitmapSrc] = useState<string | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    // Check if a dedicated bitmap image exists on disk/CDN
    let isMounted = true;
    setActiveBitmapSrc(null);

    const normalizedId = component.id.replace(/-/g, '_');
    const candidatePaths = COMPONENT_IMAGE_MAP[normalizedId] || (component.image ? [component.image] : []);

    let currentIndex = 0;

    const tryNext = () => {
      if (!isMounted || currentIndex >= candidatePaths.length) return;

      const testUrl = candidatePaths[currentIndex];
      currentIndex++;

      const img = new Image();
      img.src = testUrl;
      img.onload = () => {
        if (!isMounted) return;
        setActiveBitmapSrc(testUrl);
      };
      img.onerror = () => {
        if (!isMounted) return;
        tryNext();
      };
    };

    tryNext();

    return () => {
      isMounted = false;
    };
  }, [component.id, component.image]);

  return (
    <>
      <div 
        key={component.id}
        onClick={() => allowZoom && setIsZoomOpen(true)}
        className={`group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-2.5 transition-all duration-200 hover:border-sky-500/50 cursor-pointer ${className}`}
        title="Click to enlarge component schematic"
      >
        {/* Background blueprint subtle grid */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '12px 12px'
          }}
        />

        {/* Ambient aerospace glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

        {/* Component Visual: either real loaded image or crisp vector CAD schematic */}
        {activeBitmapSrc ? (
          <img
            src={activeBitmapSrc}
            alt={component.name}
            className="w-full h-full object-contain drop-shadow-md rounded-lg z-10 animate-in fade-in duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center z-10 p-1">
            <ComponentSvgIllustration componentId={component.id} className="w-full h-full drop-shadow-lg" />
          </div>
        )}

        {/* Overlay hover badge */}
        {allowZoom && (
          <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-900/80 border border-slate-700/60 text-[9px] font-mono text-slate-400 group-hover:text-sky-300 group-hover:border-sky-500/50 flex items-center gap-1 transition-all z-20 backdrop-blur-sm">
            <Maximize2 className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">EXPAND</span>
          </div>
        )}

        {/* Verified Spec Badge */}
        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-[9px] font-mono text-emerald-400 flex items-center gap-1 z-20 backdrop-blur-sm">
          <CheckCircle2 className="w-2.5 h-2.5" />
          <span>VERIFIED CAD</span>
        </div>

        {/* Stable CAD Reference Tag */}
        <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500 tracking-wider z-20 pointer-events-none">
          CAD REF: #{component.id.toUpperCase().replace(/-/g, '_')}
        </div>
      </div>

      {/* Lightbox Modal for HD Inspection */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                  AEROSPACE CAD SPECIFICATION
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">{component.name}</h3>
              </div>
              <button 
                onClick={() => setIsZoomOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual Display */}
            <div className="relative w-full h-72 my-4 rounded-xl bg-slate-950 border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />
              {activeBitmapSrc ? (
                <img
                  src={activeBitmapSrc}
                  alt={component.name}
                  className="w-full h-full object-contain drop-shadow-xl rounded-lg z-10"
                />
              ) : (
                <ComponentSvgIllustration componentId={component.id} className="w-full h-full z-10 drop-shadow-xl" />
              )}
            </div>

            {/* Bottom details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[9px] font-mono text-slate-500 uppercase">CATEGORY</span>
                <p className="font-medium text-white truncate mt-0.5">{component.category}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[9px] font-mono text-slate-500 uppercase">QUANTITY</span>
                <p className="font-mono text-sky-400 font-bold mt-0.5">{component.quantity}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[9px] font-mono text-slate-500 uppercase">PRICE / UNIT</span>
                <p className="font-mono text-emerald-400 font-bold mt-0.5">{component.approxPrice.split(' ')[0]}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[9px] font-mono text-slate-500 uppercase">STATUS</span>
                <p className="font-mono text-emerald-400 font-bold mt-0.5">{component.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
