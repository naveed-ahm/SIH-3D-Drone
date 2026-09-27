import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/components');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const svgs = {
  'airframe.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <defs>
      <linearGradient id="af-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc" />
        <stop offset="50%" stop-color="#e2e8f0" />
        <stop offset="100%" stop-color="#94a3b8" />
      </linearGradient>
      <linearGradient id="af-orange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff781f" />
        <stop offset="100%" stop-color="#ea580c" />
      </linearGradient>
      <linearGradient id="af-carbon" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="50%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <radialGradient id="af-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="250" cy="140" rx="220" ry="110" fill="url(#af-glow)" />
    <line x1="40" y1="140" x2="460" y2="140" stroke="#0ea5e9" stroke-width="0.75" stroke-dasharray="3 3" opacity="0.4" />
    <line x1="250" y1="20" x2="250" y2="260" stroke="#0ea5e9" stroke-width="0.75" stroke-dasharray="3 3" opacity="0.4" />
    <polygon points="50,145 250,125 450,145 440,165 250,150 60,165" fill="url(#af-body)" stroke="#cbd5e1" stroke-width="1.5" />
    <polygon points="50,145 90,141 85,163 60,165" fill="url(#af-orange)" />
    <polygon points="450,145 410,141 415,163 440,165" fill="url(#af-orange)" />
    <rect x="135" y="75" width="12" height="150" rx="5" fill="url(#af-carbon)" stroke="#475569" stroke-width="1" />
    <rect x="353" y="75" width="12" height="150" rx="5" fill="url(#af-carbon)" stroke="#475569" stroke-width="1" />
    <circle cx="141" cy="78" r="10" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="141" cy="222" r="10" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="359" cy="78" r="10" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="359" cy="222" r="10" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
    <polygon points="250,210 205,255 215,258 250,225 285,258 295,255" fill="url(#af-orange)" stroke="#cbd5e1" stroke-width="1" />
    <path d="M 250 45 C 265 65 272 105 270 170 C 268 200 258 230 250 240 C 242 230 232 200 230 170 C 228 105 235 65 250 45 Z" fill="url(#af-body)" stroke="#e2e8f0" stroke-width="2" />
    <path d="M 250 70 C 258 85 260 115 258 135 C 250 138 242 135 242 135 C 240 115 242 85 250 70 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="1" />
    <text x="250" y="272" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">HYBRID VTOL AIRFRAME | SPAN: 3,200mm | MTOW: 14.5kg</text>
  </svg>`,

  'vtol-motor.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <defs>
      <linearGradient id="vm-case" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#334155" />
        <stop offset="40%" stop-color="#1e293b" />
        <stop offset="100%" stop-color="#090d16" />
      </linearGradient>
      <linearGradient id="vm-copper" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ea580c" />
        <stop offset="50%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#b45309" />
      </linearGradient>
    </defs>
    <rect x="180" y="200" width="140" height="25" rx="6" fill="#1e293b" stroke="#475569" stroke-width="2" />
    <circle cx="205" cy="212" r="5" fill="#0f172a" stroke="#94a3b8" stroke-width="1" />
    <circle cx="295" cy="212" r="5" fill="#0f172a" stroke="#94a3b8" stroke-width="1" />
    <rect x="195" y="155" width="110" height="45" rx="4" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
    <rect x="185" y="80" width="130" height="75" rx="10" fill="url(#vm-case)" stroke="#64748b" stroke-width="2" />
    <rect x="242" y="30" width="16" height="50" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1" />
    <text x="250" y="130" fill="#f8fafc" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">5010 360KV VTOL LIFT MOTOR</text>
    <text x="250" y="245" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">IP55 WEATHER SEALED | 3,850g MAX THRUST</text>
  </svg>`,

  'vtol-propeller.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <path d="M 230 140 C 190 120 120 115 45 125 C 35 127 30 145 40 152 C 115 165 190 155 230 145 Z" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
    <path d="M 85 122 C 60 123 45 125 45 125 C 35 127 30 145 40 152 C 55 155 75 158 85 158 Z" fill="#ea580c" />
    <path d="M 270 140 C 310 120 380 115 455 125 C 465 127 470 145 460 152 C 385 165 310 155 270 145 Z" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
    <path d="M 415 122 C 440 123 455 125 455 125 C 465 127 470 145 460 152 C 445 155 425 158 415 158 Z" fill="#ea580c" />
    <rect x="225" y="122" width="50" height="36" rx="8" fill="#334155" stroke="#94a3b8" stroke-width="2" />
    <circle cx="250" cy="140" r="7" fill="#020617" stroke="#38bdf8" stroke-width="2" />
    <text x="250" y="215" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">16 x 5.5 INCH FOLDING CARBON FIBER</text>
    <text x="250" y="235" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">WHISPER-QUIET ACOUSTIC PROFILE (-6.5 dB)</text>
  </svg>`,

  'flight-controller.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="130" y="45" width="240" height="190" rx="14" fill="#090d16" stroke="#334155" stroke-width="2.5" />
    <rect x="175" y="75" width="150" height="130" rx="12" fill="#ea580c" stroke="#ffedd5" stroke-width="1.5" />
    <circle cx="250" cy="130" r="18" fill="#22c55e" stroke="#86efac" stroke-width="3" />
    <text x="250" y="165" fill="#ffffff" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">CUBE ORANGE+ AUTOPILOT</text>
    <text x="250" y="180" fill="#fed7aa" font-size="8" font-family="monospace" text-anchor="middle">TRIPLE-REDUNDANT IMU | PX4 & ARDUPILOT</text>
  </svg>`,

  'gps-compass.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="245" y="160" width="10" height="90" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
    <ellipse cx="250" cy="110" rx="90" ry="45" fill="#0f172a" stroke="#475569" stroke-width="2" />
    <ellipse cx="250" cy="105" rx="75" ry="34" fill="#090d16" stroke="#38bdf8" stroke-width="1" />
    <text x="250" y="115" fill="#f8fafc" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">HERE3+ RTK GNSS</text>
    <text x="250" y="210" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">&lt; 1.5 cm PRECISION RTK NAVIGATION</text>
  </svg>`,

  'camera-gimbal.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="180" y="95" width="140" height="120" rx="20" fill="#0f172a" stroke="#64748b" stroke-width="2" />
    <circle cx="225" cy="145" r="28" fill="#0284c7" stroke="#94a3b8" stroke-width="3" />
    <circle cx="280" cy="140" r="18" fill="#d97706" stroke="#ca8a04" stroke-width="2.5" />
    <rect x="265" y="170" width="30" height="14" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="1" />
    <text x="250" y="240" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">EO/IR DUAL THERMAL GIMBAL</text>
  </svg>`,

  'battery.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="120" y="70" width="260" height="135" rx="14" fill="#0f172a" stroke="#334155" stroke-width="2" />
    <rect x="120" y="115" width="260" height="35" fill="#ea580c" opacity="0.9" />
    <text x="250" y="137" fill="#ffffff" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">6S 22,000mAh | 488.4Wh</text>
    <rect x="435" y="112" width="30" height="42" rx="6" fill="#eab308" stroke="#ca8a04" stroke-width="2" />
    <text x="250" y="180" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">SEMI-SOLID STATE LITHIUM-ION (120 MIN ENDURANCE)</text>
  </svg>`,

  'pitot-airspeed.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="50" y="125" width="260" height="12" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.5" />
    <rect x="385" y="80" width="80" height="100" rx="8" fill="#090d16" stroke="#38bdf8" stroke-width="1.5" />
    <text x="250" y="215" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">DIGITAL AIRSPEED TRANSDUCER & HEATED PITOT</text>
  </svg>`,

  'vtol-esc.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="140" y="70" width="220" height="140" rx="10" fill="#0f172a" stroke="#475569" stroke-width="2" />
    <circle cx="165" cy="180" r="14" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
    <circle cx="198" cy="180" r="14" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
    <text x="250" y="130" fill="#f8fafc" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">60A OPTO INDUSTRIAL ESC</text>
    <text x="250" y="240" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">IP67 SEALED | DSHOT1200 | 6S-12S</text>
  </svg>`,

  'cruise-motor.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="180" y="90" width="140" height="90" rx="8" fill="#1e293b" stroke="#64748b" stroke-width="2" />
    <text x="250" y="140" fill="#f8fafc" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">3520 720KV CRUISE MOTOR</text>
    <text x="250" y="225" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">HIGH-EFFICIENCY PUSHER PROPULSION</text>
  </svg>`,

  'cruise-propeller.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <path d="M 250 140 C 230 90 200 40 180 30 C 195 45 235 105 250 140 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5" />
    <path d="M 250 140 C 270 190 300 240 320 250 C 305 235 265 175 250 140 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5" />
    <circle cx="250" cy="140" r="16" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="250" y="225" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">13 x 8 INCH RIGID CRUISE PROPELLER</text>
  </svg>`,

  'cruise-esc.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="150" y="80" width="200" height="120" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="250" y="145" fill="#f8fafc" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">50A BLHELI_32 ESC</text>
    <text x="250" y="235" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">REGENERATIVE BRAKING & ACTIVE FREEWHEELING</text>
  </svg>`,

  'servo.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="180" y="80" width="140" height="120" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2" />
    <rect x="180" y="115" width="140" height="40" fill="#0284c7" opacity="0.9" />
    <circle cx="215" cy="80" r="16" fill="#f8fafc" stroke="#475569" stroke-width="2" />
    <text x="250" y="235" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">WATERPROOF DIGITAL AILERON SERVO</text>
  </svg>`,

  'telemetry.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="160" y="80" width="180" height="110" rx="10" fill="#090d16" stroke="#0284c7" stroke-width="2" />
    <text x="250" y="145" fill="#f8fafc" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">915MHz 1W DATALINK</text>
    <text x="250" y="235" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">45km ENCRYPTED MISSION TELEMETRY</text>
  </svg>`,

  'fuselage.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <path d="M 60 140 C 90 100 200 95 380 115 C 430 120 460 135 460 140 C 460 145 430 160 380 165 C 200 185 90 180 60 140 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2" />
    <text x="250" y="225" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">STREAMLINED COMPOSITE FUSELAGE</text>
  </svg>`,

  'left-wing.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <polygon points="60,110 400,90 440,150 70,170" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
    <polygon points="400,90 440,90 440,150 400,140" fill="#ea580c" />
    <text x="250" y="225" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">PORT COMPOSITE FIXED WING</text>
  </svg>`,

  'right-wing.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <polygon points="60,110 400,90 440,150 70,170" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
    <polygon points="400,90 440,90 440,150 400,140" fill="#ea580c" />
    <text x="250" y="225" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">STARBOARD COMPOSITE FIXED WING</text>
  </svg>`,

  'landing-gear.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <path d="M 250 60 L 160 190" stroke="#334155" stroke-width="10" stroke-linecap="round" />
    <path d="M 250 60 L 340 190" stroke="#334155" stroke-width="10" stroke-linecap="round" />
    <circle cx="150" cy="200" r="22" fill="#0f172a" stroke="#64748b" stroke-width="5" />
    <circle cx="350" cy="200" r="22" fill="#0f172a" stroke="#64748b" stroke-width="5" />
    <text x="250" y="245" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">CARBON FIBER TRICYCLE GEAR</text>
  </svg>`,

  'barometer.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="170" y="70" width="160" height="130" rx="10" fill="#090d16" stroke="#334155" stroke-width="2" />
    <rect x="210" y="100" width="80" height="60" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5" />
    <text x="250" y="235" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">MS5611 BAROMETRIC ALTIMETER</text>
  </svg>`,

  'rc-receiver.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="170" y="80" width="160" height="100" rx="8" fill="#090d16" stroke="#0284c7" stroke-width="2" />
    <text x="250" y="140" fill="#f8fafc" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">EXPRESSLRS DIVERSITY RX</text>
    <text x="250" y="230" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">LONG-RANGE CONTROL LINK</text>
  </svg>`,

  'power-module.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="160" y="80" width="180" height="100" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <text x="250" y="140" fill="#38bdf8" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">HALL 200A POWER MODULE</text>
    <text x="250" y="230" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">HIGH-PRECISION VOLTAGE & CURRENT SENSING</text>
  </svg>`,

  'pdb.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="140" y="60" width="220" height="145" rx="12" fill="#090d16" stroke="#eab308" stroke-width="2" />
    <circle cx="170" cy="85" r="10" fill="#eab308" />
    <circle cx="330" cy="85" r="10" fill="#eab308" />
    <circle cx="170" cy="180" r="10" fill="#eab308" />
    <circle cx="330" cy="180" r="10" fill="#eab308" />
    <text x="250" y="235" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">4-LAYER 4oz COPPER PDB</text>
  </svg>`,

  'bec.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <rect x="160" y="75" width="180" height="110" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2" />
    <circle cx="215" cy="130" r="22" fill="#b45309" stroke="#ea580c" stroke-width="2" />
    <text x="250" y="235" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">10A DUAL VOLTAGE REGULATOR (BEC)</text>
  </svg>`,

  'wiring.svg': `<svg viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="280" fill="#020617"/>
    <path d="M 80 140 C 180 80 320 200 420 140" stroke="#334155" stroke-width="18" stroke-linecap="round" />
    <text x="250" y="235" fill="#38bdf8" font-size="10" font-family="monospace" font-weight="bold" text-anchor="middle">MIL-SPEC TEFZEL WIRE HARNESS</text>
  </svg>`
};

for (const [filename, svgContent] of Object.entries(svgs)) {
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, svgContent.trim());
  console.log(`Generated: ${filename}`);
}
console.log('All component SVGs generated successfully!');
