import React from 'react';

interface ComponentSvgProps {
  className?: string;
}

export const ComponentSvgIllustration: React.FC<{ componentId: string; className?: string }> = ({
  componentId,
  className = 'w-full h-full'
}) => {
  const normId = componentId.toLowerCase().replace(/-/g, '_');

  switch (normId) {
    case 'airframe':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="af-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="af-orange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff781f" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="af-carbon" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="af-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="250" cy="140" rx="220" ry="110" fill="url(#af-glow)" />
          {/* Grid lines */}
          <line x1="40" y1="140" x2="460" y2="140" stroke="#0ea5e9" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
          <line x1="250" y1="20" x2="250" y2="260" stroke="#0ea5e9" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
          
          {/* Main Wings (Span: ~420px) */}
          <polygon points="50,145 250,125 450,145 440,165 250,150 60,165" fill="url(#af-body)" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Orange Wingtips */}
          <polygon points="50,145 90,141 85,163 60,165" fill="url(#af-orange)" />
          <polygon points="450,145 410,141 415,163 440,165" fill="url(#af-orange)" />
          {/* Wing Aileron line */}
          <line x1="100" y1="158" x2="190" y2="152" stroke="#475569" strokeWidth="1.5" />
          <line x1="310" y1="152" x2="400" y2="158" stroke="#475569" strokeWidth="1.5" />

          {/* Twin Carbon Fiber VTOL Booms */}
          {/* Left Boom */}
          <rect x="135" y="75" width="12" height="150" rx="5" fill="url(#af-carbon)" stroke="#475569" strokeWidth="1" />
          {/* Right Boom */}
          <rect x="353" y="75" width="12" height="150" rx="5" fill="url(#af-carbon)" stroke="#475569" strokeWidth="1" />
          {/* Boom motor pods */}
          <circle cx="141" cy="78" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="141" cy="222" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="359" cy="78" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="359" cy="222" r="10" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          
          {/* Inverted V-Tail */}
          <polygon points="250,210 205,255 215,258 250,225 285,258 295,255" fill="url(#af-orange)" stroke="#cbd5e1" strokeWidth="1" />

          {/* Central Fuselage Body */}
          <path d="M 250 45 C 265 65 272 105 270 170 C 268 200 258 230 250 240 C 242 230 232 200 230 170 C 228 105 235 65 250 45 Z" fill="url(#af-body)" stroke="#e2e8f0" strokeWidth="2" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))" />
          {/* Cockpit / Avionics Canopy Hatch */}
          <path d="M 250 70 C 258 85 260 115 258 135 C 250 138 242 135 242 135 C 240 115 242 85 250 70 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          {/* Nose Pitot Tube */}
          <line x1="250" y1="45" x2="250" y2="30" stroke="#94a3b8" strokeWidth="2" />
          {/* Camera Gimbal Dome underneath nose */}
          <circle cx="250" cy="58" r="6" fill="#0284c7" opacity="0.8" />
          
          {/* High-visibility Stripes */}
          <path d="M 235 150 L 265 150 L 263 160 L 237 160 Z" fill="url(#af-orange)" />
          
          {/* Technical Specs Callout Overlay */}
          <g fontSize="9" fontFamily="monospace" fill="#38bdf8" opacity="0.9">
            <text x="250" y="272" textAnchor="middle" fill="#94a3b8">SPAN: 3,200mm | MTOW: 14.5kg | ENDURANCE: 120min</text>
            <rect x="20" y="25" width="130" height="20" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" opacity="0.85" />
            <text x="28" y="38" fill="#38bdf8" fontWeight="bold">HYBRID VTOL AIRFRAME</text>
          </g>
        </svg>
      );

    case 'vtol_motor':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vm-case" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
            <linearGradient id="vm-copper" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="vm-shaft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          {/* Base plate & mounting holes */}
          <rect x="180" y="200" width="140" height="25" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <circle cx="205" cy="212" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="295" cy="212" r="5" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
          
          {/* 3-Phase Silicone Power Leads */}
          <path d="M 215 225 C 205 245 160 255 120 260" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
          <path d="M 225 225 C 220 250 180 262 140 268" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          <path d="M 235 225 C 235 255 200 270 160 275" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
          
          {/* Motor Lower Stator Base */}
          <rect x="195" y="155" width="110" height="45" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          
          {/* Visible Copper Windings inside Stator */}
          <g fill="url(#vm-copper)">
            <rect x="202" y="160" width="8" height="35" rx="2" />
            <rect x="214" y="160" width="8" height="35" rx="2" />
            <rect x="226" y="160" width="8" height="35" rx="2" />
            <rect x="238" y="160" width="8" height="35" rx="2" />
            <rect x="250" y="160" width="8" height="35" rx="2" />
            <rect x="262" y="160" width="8" height="35" rx="2" />
            <rect x="274" y="160" width="8" height="35" rx="2" />
            <rect x="286" y="160" width="8" height="35" rx="2" />
          </g>

          {/* Rotor Bell Outer Housing */}
          <rect x="185" y="80" width="130" height="75" rx="10" fill="url(#vm-case)" stroke="#64748b" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.6))" />
          {/* CNC Cooling Intake Vents */}
          <rect x="198" y="90" width="14" height="24" rx="3" fill="#090d16" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="218" y="90" width="14" height="24" rx="3" fill="#090d16" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="238" y="90" width="14" height="24" rx="3" fill="#090d16" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="258" y="90" width="14" height="24" rx="3" fill="#090d16" stroke="#38bdf8" strokeWidth="0.8" />
          <rect x="278" y="90" width="14" height="24" rx="3" fill="#090d16" stroke="#38bdf8" strokeWidth="0.8" />

          {/* Bell Laser-Etched Branding Badge */}
          <text x="250" y="135" fill="#f8fafc" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">SILENTRESQ 5010 360KV</text>
          <text x="250" y="146" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">MAX THRUST: 3,850g | IP55 SEALED</text>

          {/* Hardened Steel Motor Shaft */}
          <rect x="242" y="30" width="16" height="50" rx="3" fill="url(#vm-shaft)" stroke="#cbd5e1" strokeWidth="1" />
          {/* Shaft Thread & Prop Washer */}
          <rect x="235" y="65" width="30" height="12" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
          <line x1="242" y1="42" x2="258" y2="42" stroke="#475569" strokeWidth="1" />
          <line x1="242" y1="48" x2="258" y2="48" stroke="#475569" strokeWidth="1" />
          <line x1="242" y1="54" x2="258" y2="54" stroke="#475569" strokeWidth="1" />
        </svg>
      );

    case 'vtol_propeller':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vp-carbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="30%" stopColor="#0f172a" />
              <stop offset="70%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="vp-tip" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff781f" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* Left Propeller Blade (Curved 16" airfoil) */}
          <path d="M 230 140 C 190 120 120 115 45 125 C 35 127 30 145 40 152 C 115 165 190 155 230 145 Z" fill="url(#vp-carbon)" stroke="#475569" strokeWidth="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))" />
          {/* Left Orange Rescue Tip */}
          <path d="M 85 122 C 60 123 45 125 45 125 C 35 127 30 145 40 152 C 55 155 75 158 85 158 Z" fill="url(#vp-tip)" stroke="#ff781f" strokeWidth="1" />
          <line x1="88" y1="122" x2="88" y2="158" stroke="#ffffff" strokeWidth="2" />

          {/* Right Propeller Blade */}
          <path d="M 270 140 C 310 120 380 115 455 125 C 465 127 470 145 460 152 C 385 165 310 155 270 145 Z" fill="url(#vp-carbon)" stroke="#475569" strokeWidth="1.5" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.5))" />
          {/* Right Orange Rescue Tip */}
          <path d="M 415 122 C 440 123 455 125 455 125 C 465 127 470 145 460 152 C 445 155 425 158 415 158 Z" fill="url(#vp-tip)" stroke="#ff781f" strokeWidth="1" />
          <line x1="412" y1="122" x2="412" y2="158" stroke="#ffffff" strokeWidth="2" />

          {/* Center CNC Aluminum Folding Hub */}
          <rect x="225" y="122" width="50" height="36" rx="8" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="238" cy="140" r="5" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="262" cy="140" r="5" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx="250" cy="140" r="7" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
          
          {/* Technical Specs Callout */}
          <g fontSize="10" fontFamily="monospace" fill="#38bdf8" textAnchor="middle">
            <text x="250" y="210" fontWeight="bold">16 x 5.5 INCH FOLDING CARBON FIBER</text>
            <text x="250" y="226" fill="#94a3b8" fontSize="9">LOW ACOUSTIC SIGNATURE (-6.5 dB) | WEIGHT: 24g</text>
          </g>
        </svg>
      );

    case 'flight_controller':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fc-cube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff781f" />
              <stop offset="60%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>
            <radialGradient id="fc-led" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="40%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>
          </defs>
          {/* Black Carrier Base Board with Gold Pins */}
          <rect x="130" y="45" width="240" height="190" rx="14" fill="#090d16" stroke="#334155" strokeWidth="2.5" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.7))" />
          
          {/* JST-GH Port arrays (Top and Bottom) */}
          <g fill="#cbd5e1" stroke="#475569" strokeWidth="1">
            <rect x="145" y="55" width="30" height="12" rx="2" />
            <rect x="185" y="55" width="35" height="12" rx="2" />
            <rect x="230" y="55" width="40" height="12" rx="2" />
            <rect x="280" y="55" width="40" height="12" rx="2" />
            <rect x="330" y="55" width="25" height="12" rx="2" />
            
            <rect x="145" y="213" width="35" height="12" rx="2" />
            <rect x="190" y="213" width="35" height="12" rx="2" />
            <rect x="235" y="213" width="35" height="12" rx="2" />
            <rect x="280" y="213" width="45" height="12" rx="2" />
          </g>

          {/* CNC Anodized Orange Core Cube */}
          <rect x="175" y="75" width="150" height="130" rx="12" fill="url(#fc-cube)" stroke="#ffedd5" strokeWidth="1.5" filter="drop-shadow(0 6px 16px rgba(234,88,12,0.4))" />
          
          {/* Central Multicolored Status RGB LED */}
          <circle cx="250" cy="130" r="18" fill="url(#fc-led)" stroke="#86efac" strokeWidth="3" filter="drop-shadow(0 0 10px #22c55e)" />
          <circle cx="250" cy="130" r="8" fill="#ffffff" opacity="0.8" />
          
          {/* Autopilot Heading Arrow */}
          <polygon points="250,85 240,100 260,100" fill="#ffffff" />
          
          {/* Laser-etched typography */}
          <text x="250" y="165" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">CUBE ORANGE+</text>
          <text x="250" y="177" fill="#fed7aa" fontSize="7.5" fontFamily="monospace" textAnchor="middle">TRIPLE IMU | HEATED BARO | ADS-B IN</text>
          <text x="250" y="190" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">AUTONOMOUS MISSION CONTROL</text>
        </svg>
      );

    case 'gps_compass':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gps-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="gps-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </radialGradient>
          </defs>
          {/* Carbon Mast Rod */}
          <rect x="245" y="160" width="10" height="90" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          {/* Folding Mast Mount */}
          <rect x="230" y="240" width="40" height="20" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />

          {/* Aerodynamic GNSS Disc Puck Housing */}
          <ellipse cx="250" cy="110" rx="90" ry="45" fill="url(#gps-body)" stroke="#475569" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          <ellipse cx="250" cy="105" rx="75" ry="34" fill="#090d16" stroke="#38bdf8" strokeWidth="1" />
          
          {/* Forward Heading Indicator Chevron */}
          <polygon points="250,85 240,98 260,98" fill="#38bdf8" />
          <text x="250" y="116" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HERE3+ RTK GNSS</text>
          <text x="250" y="128" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">CAN / MULTI-BAND L1+L5</text>
          
          {/* Status LEDs (Fix, RTK, Power) */}
          <circle cx="225" cy="132" r="4" fill="#22c55e" filter="drop-shadow(0 0 6px #22c55e)" />
          <circle cx="250" cy="134" r="4" fill="#0284c7" filter="drop-shadow(0 0 6px #0284c7)" />
          <circle cx="275" cy="132" r="4" fill="#eab308" filter="drop-shadow(0 0 6px #eab308)" />
          
          <text x="250" y="220" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">&lt; 1.5 cm CENTIMETER RTK ACCURACY</text>
        </svg>
      );

    case 'camera_gimbal':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gm-case" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="gm-optics" cx="45%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </radialGradient>
            <radialGradient id="gm-flir" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </radialGradient>
          </defs>
          {/* Quick-release Top Damper Plate */}
          <rect x="200" y="25" width="100" height="15" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <circle cx="215" cy="32" r="5" fill="#0284c7" />
          <circle cx="285" cy="32" r="5" fill="#0284c7" />

          {/* Yaw Axis Motor & Yoke */}
          <rect x="235" y="40" width="30" height="25" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
          <path d="M 235 55 C 200 55 190 90 190 120" stroke="#475569" strokeWidth="10" strokeLinecap="round" />
          
          {/* Pitch / Roll Gimbal Pod Housing */}
          <rect x="180" y="95" width="140" height="120" rx="20" fill="url(#gm-case)" stroke="#64748b" strokeWidth="2" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.7))" />

          {/* Primary Optical Zoom Lens (Left Aperture) */}
          <circle cx="225" cy="145" r="28" fill="url(#gm-optics)" stroke="#94a3b8" strokeWidth="3" filter="drop-shadow(0 0 10px rgba(56,189,248,0.5))" />
          <circle cx="225" cy="145" r="16" fill="#082f49" />
          <circle cx="220" cy="140" r="6" fill="#ffffff" opacity="0.7" />

          {/* Radiometric FLIR Thermal Sensor (Right Aperture) */}
          <circle cx="280" cy="140" r="18" fill="url(#gm-flir)" stroke="#d97706" strokeWidth="2.5" />
          <circle cx="280" cy="140" r="8" fill="#451a03" />

          {/* High-intensity 1500-Lumen LED Searchlight */}
          <rect x="265" y="170" width="30" height="14" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" filter="drop-shadow(0 0 8px #fef08a)" />

          <text x="250" y="240" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">EO/IR DUAL THERMAL GIMBAL</text>
          <text x="250" y="254" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">4K 30x OPTICAL ZOOM + 640x512 FLIR</text>
        </svg>
      );

    case 'battery':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bat-wrap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="25%" stopColor="#0f172a" />
              <stop offset="75%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="bat-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff781f" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* Main 6S Battery Block */}
          <rect x="120" y="70" width="260" height="135" rx="14" fill="url(#bat-wrap)" stroke="#334155" strokeWidth="2" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.6))" />
          
          {/* High-visibility Rescue Warning Stripe */}
          <rect x="120" y="115" width="260" height="35" fill="url(#bat-amber)" opacity="0.9" />
          <text x="250" y="137" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">6S 22,000mAh | 488.4Wh</text>

          {/* Heavy Gauge 8AWG Power Leads */}
          <path d="M 370 100 C 410 100 420 120 440 120" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <path d="M 370 160 C 410 160 420 145 440 145" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
          
          {/* XT90-S Anti-Spark Yellow Connector */}
          <rect x="435" y="112" width="30" height="42" rx="6" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="448" cy="123" r="4" fill="#0f172a" />
          <circle cx="448" cy="143" r="4" fill="#0f172a" />

          {/* Digital Smart BMS OLED Screen */}
          <rect x="145" y="85" width="80" height="24" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
          <text x="185" y="101" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">24.8V 100%</text>

          {/* 6S Balance Lead */}
          <path d="M 370 82 C 400 82 410 75 425 75" stroke="#94a3b8" strokeWidth="3" />
          <rect x="425" y="70" width="16" height="10" rx="2" fill="#f8fafc" stroke="#64748b" strokeWidth="1" />

          {/* Bottom Specs */}
          <text x="250" y="180" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">SEMI-SOLID STATE LITHIUM-ION | WEIGHT: 2,650g</text>
        </svg>
      );

    case 'pitot_airspeed':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Heated Stainless Steel Pitot Tube */}
          <rect x="50" y="125" width="260" height="12" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.5))" />
          {/* Dynamic Port Tip */}
          <path d="M 50 127 C 40 127 35 131 35 131 C 35 131 40 135 50 135 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
          {/* Static Ports on Tube Side */}
          <circle cx="100" cy="131" r="1.5" fill="#0f172a" />
          <circle cx="106" cy="131" r="1.5" fill="#0f172a" />
          <circle cx="112" cy="131" r="1.5" fill="#0f172a" />

          {/* Dual Pneumatic Tubes (Green & Clear) */}
          <path d="M 305 127 C 340 127 350 100 390 100" stroke="#22c55e" strokeWidth="5" fill="none" />
          <path d="M 305 135 C 340 135 350 160 390 160" stroke="#38bdf8" strokeWidth="5" fill="none" opacity="0.8" />

          {/* Digital Differential Pressure Transducer Board */}
          <rect x="385" y="80" width="80" height="100" rx="8" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="400" y="110" width="50" height="35" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <text x="425" y="132" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MS4525</text>
          
          <text x="250" y="210" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">DIGITAL AIRSPEED SYSTEM</text>
          <text x="250" y="226" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">HEATED DE-ICING PITOT TUBE | I2C PRECISION SENSOR</text>
        </svg>
      );

    case 'vtol_esc':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Aluminum Heatsink Fins */}
          <rect x="140" y="70" width="220" height="140" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* Heatsink fin slats */}
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={155 + i * 22} y="85" width="12" height="70" rx="2" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
          ))}
          {/* Solid Electrolytic Capacitors */}
          <circle cx="165" cy="180" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="198" cy="180" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          
          {/* Power Input Leads (Left) */}
          <path d="M 140 100 L 70 100" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
          <path d="M 140 130 L 70 130" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
          
          {/* 3-Phase Motor Leads (Right) */}
          <path d="M 360 90 L 430 80" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <path d="M 360 115 L 430 115" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
          <path d="M 360 140 L 430 150" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />

          <text x="250" y="235" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">VTOL 60A OPTO INDUSTRIAL ESC</text>
          <text x="250" y="249" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">6S-12S COMPATIBLE | DSHOT1200 | IP67 SEALED</text>
        </svg>
      );

    case 'cruise_motor':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Forward pusher motor tapered body */}
          <rect x="180" y="90" width="140" height="90" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* Rear pusher propeller shaft adapter */}
          <rect x="315" y="125" width="40" height="20" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          {/* Airflow cooling vents */}
          <g fill="#090d16" stroke="#38bdf8" strokeWidth="0.8">
            <rect x="195" y="105" width="12" height="60" rx="2" />
            <rect x="215" y="105" width="12" height="60" rx="2" />
            <rect x="235" y="105" width="12" height="60" rx="2" />
          </g>
          <text x="250" y="215" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CRUISE PUSHER MOTOR (3520 / 720KV)</text>
          <text x="250" y="230" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">AERODYNAMIC HIGH-SPEED FORWARD FLIGHT PROPULSION</text>
        </svg>
      );

    case 'cruise_propeller':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 13x8 Pusher Propeller blades */}
          <path d="M 250 140 C 230 90 200 40 180 30 C 195 45 235 105 250 140 Z" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 250 140 C 270 190 300 240 320 250 C 305 235 265 175 250 140 Z" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Center Spinner Nut */}
          <circle cx="250" cy="140" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="250" cy="140" r="6" fill="#cbd5e1" />
          <text x="250" y="215" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">13 x 8 INCH RIGID CRUISE PROPELLER</text>
          <text x="250" y="230" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">AERODYNAMIC HIGH-PITCH BLADE PROFILE</text>
        </svg>
      );

    case 'servo':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Digital Servo Housing */}
          <rect x="180" y="80" width="140" height="120" rx="8" fill="#1e293b" stroke="#0284c7" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* Aluminum Heat Sink Mid-section */}
          <rect x="180" y="115" width="140" height="40" fill="#0284c7" opacity="0.9" />
          {/* Output Splined Arm */}
          <circle cx="215" cy="80" r="16" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          <rect x="210" y="45" width="10" height="40" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
          <circle cx="215" cy="52" r="3" fill="#0f172a" />
          <text x="250" y="235" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">WATERPROOF DIGITAL AILERON SERVO</text>
          <text x="250" y="249" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">TITANIUM GEARS | 12 kg-cm TORQUE | CORELESS MOTOR</text>
        </svg>
      );

    case 'telemetry':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Anodized RF Shield Module */}
          <rect x="160" y="80" width="180" height="110" rx="10" fill="#090d16" stroke="#0284c7" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* SMA Antenna Connector */}
          <rect x="335" y="125" width="25" height="20" rx="2" fill="#ca8a04" stroke="#eab308" strokeWidth="1.5" />
          {/* Dipole Antenna */}
          <rect x="360" y="130" width="80" height="10" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          {/* Status LEDs */}
          <circle cx="185" cy="105" r="4" fill="#22c55e" filter="drop-shadow(0 0 6px #22c55e)" />
          <circle cx="205" cy="105" r="4" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
          <text x="250" y="145" fill="#f8fafc" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">915MHz 1W DATALINK</text>
          <text x="250" y="225" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LONG-RANGE TELEMETRY TRANSCEIVER</text>
          <text x="250" y="240" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">AES-256 ENCRYPTED | 45km LOS RANGE</text>
        </svg>
      );

    case 'fuselage':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fus-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          {/* Aerodynamic Composite Fuselage Pod */}
          <path d="M 60 140 C 90 100 200 95 380 115 C 430 120 460 135 460 140 C 460 145 430 160 380 165 C 200 185 90 180 60 140 Z" fill="url(#fus-grad)" stroke="#cbd5e1" strokeWidth="2" filter="drop-shadow(0 12px 24px rgba(0,0,0,0.6))" />
          {/* Quick-release Top Avionics Bay Hatch */}
          <path d="M 160 118 C 220 113 280 115 340 120 L 335 135 C 280 132 220 130 165 132 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          {/* Nose Camera Opening */}
          <circle cx="85" cy="140" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <text x="250" y="215" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">STREAMLINED COMPOSITE FUSELAGE</text>
          <text x="250" y="230" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">IP54 WEATHERPROOF | QUICK-ACCESS AVIONICS BAY</text>
        </svg>
      );

    case 'left_wing':
    case 'right_wing':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          {/* Fixed Wing Aerodynamic Planform */}
          <polygon points="60,110 400,90 440,150 70,170" fill="url(#wing-grad)" stroke="#94a3b8" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.5))" />
          {/* High-visibility Orange Winglet */}
          <polygon points="400,90 440,90 440,150 400,140" fill="#ea580c" />
          {/* Internal Carbon Spar Tube Outline */}
          <line x1="65" y1="130" x2="420" y2="115" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" opacity="0.8" />
          <text x="250" y="215" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HIGH-LIFT CARBON COMPOSITE WING</text>
          <text x="250" y="230" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">INTEGRATED AILERON & CARBON REINFORCING SPAR</text>
        </svg>
      );

    case 'landing_gear':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tricycle Spring Landing Gear Struts */}
          <path d="M 250 60 L 160 190" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
          <path d="M 250 60 L 340 190" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
          {/* Wheels */}
          <circle cx="150" cy="200" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="5" />
          <circle cx="150" cy="200" r="8" fill="#94a3b8" />
          <circle cx="350" cy="200" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="5" />
          <circle cx="350" cy="200" r="8" fill="#94a3b8" />
          <text x="250" y="245" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CARBON FIBER TRICYCLE LANDING GEAR</text>
        </svg>
      );

    case 'barometer':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="170" y="70" width="160" height="130" rx="10" fill="#090d16" stroke="#334155" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          <rect x="210" y="100" width="80" height="60" rx="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="230" cy="130" r="4" fill="#0f172a" />
          <text x="250" y="145" fill="#0f172a" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MS5611</text>
          {/* Gold solder pads */}
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x={185 + i * 36} y="182" width="20" height="8" rx="2" fill="#eab308" />
          ))}
          <text x="250" y="235" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HIGH-PRECISION BAROMETRIC ALTIMETER</text>
          <text x="250" y="249" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">10cm RELATIVE ALTITUDE RESOLUTION | I2C BUS</text>
        </svg>
      );

    case 'rc_receiver':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="170" y="80" width="160" height="100" rx="8" fill="#090d16" stroke="#0284c7" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* Dual IPEX Antennas */}
          <path d="M 170 105 C 120 105 90 70 60 50" stroke="#f8fafc" strokeWidth="3" />
          <path d="M 170 145 C 120 145 90 180 60 200" stroke="#f8fafc" strokeWidth="3" />
          {/* Dipole T-sleeves */}
          <rect x="50" y="40" width="10" height="20" rx="2" fill="#ef4444" />
          <rect x="50" y="190" width="10" height="20" rx="2" fill="#ef4444" />
          <circle cx="210" cy="115" r="4" fill="#22c55e" filter="drop-shadow(0 0 6px #22c55e)" />
          <text x="250" y="140" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">EXPRESSLRS DIVERSITY</text>
          <text x="250" y="225" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LONG-RANGE RC CONTROL RECEIVER</text>
          <text x="250" y="240" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">DUAL TRUE DIVERSITY | ULTRA-LOW LATENCY</text>
        </svg>
      );

    case 'power_module':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="160" y="80" width="180" height="100" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* Hall sensor chip */}
          <rect x="220" y="110" width="60" height="40" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <text x="250" y="134" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HALL 200A</text>
          {/* XT90 heavy copper pass-through */}
          <path d="M 160 110 L 90 110" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <path d="M 340 110 L 410 110" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
          <text x="250" y="225" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HIGH-PRECISION POWER SENSING MODULE</text>
          <text x="250" y="240" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">200A CONTINUOUS | VOLTAGE & CURRENT TELEMETRY</text>
        </svg>
      );

    case 'pdb':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="140" y="60" width="220" height="145" rx="12" fill="#090d16" stroke="#eab308" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* Gold solder pads for 4 VTOL motors + 1 pusher */}
          <circle cx="170" cy="85" r="10" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="330" cy="85" r="10" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="170" cy="180" r="10" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="330" cy="180" r="10" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="250" cy="130" r="16" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <text x="250" y="135" fill="#0f172a" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MAIN</text>
          <text x="250" y="235" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HEAVY COPPER POWER DISTRIBUTION BOARD</text>
          <text x="250" y="249" fill="#94a3b8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">4-LAYER 4oz COPPER | TVS SURGE TRANSIENT SUPPRESSION</text>
        </svg>
      );

    case 'bec':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="160" y="75" width="180" height="110" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          {/* Toroidal Inductor */}
          <circle cx="215" cy="130" r="22" fill="#b45309" stroke="#ea580c" strokeWidth="2" />
          <circle cx="215" cy="130" r="10" fill="#0f172a" />
          {/* Filtering Capacitors */}
          <circle cx="275" cy="115" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="275" cy="145" r="12" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
          <text x="250" y="225" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">10A DUAL VOLTAGE REGULATOR (BEC)</text>
          <text x="250" y="240" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">5.3V / 12V CLEAN AVIONICS POWER | 95% EFFICIENCY</text>
        </svg>
      );

    case 'wiring':
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Braided wiring harness */}
          <path d="M 80 140 C 180 80 320 200 420 140" stroke="#334155" strokeWidth="18" strokeLinecap="round" />
          <path d="M 80 140 C 180 80 320 200 420 140" stroke="#0f172a" strokeWidth="14" strokeLinecap="round" strokeDasharray="6 4" />
          {/* Locking connectors on ends */}
          <rect x="65" y="125" width="30" height="30" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="405" y="125" width="30" height="30" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="250" y="225" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MIL-SPEC SHIELDED HARNESS</text>
          <text x="250" y="240" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">TEFZEL FLAME-RETARDANT SILICONE WIRE & NOMEX SLEEVE</text>
        </svg>
      );

    default:
      // Generic high-tech aerospace hardware fallback
      return (
        <svg viewBox="0 0 500 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="140" y="70" width="220" height="140" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" filter="drop-shadow(0 10px 20px rgba(0,0,0,0.6))" />
          <circle cx="250" cy="130" r="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="250" cy="130" r="12" fill="#0284c7" />
          <text x="250" y="185" fill="#f8fafc" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{normId.toUpperCase()}</text>
          <text x="250" y="235" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">AEROSPACE CERTIFIED COMPONENT</text>
        </svg>
      );
  }
};
