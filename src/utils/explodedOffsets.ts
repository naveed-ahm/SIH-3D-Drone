// Exploded component offsets and guide line endpoints for SilentResQ Hybrid VTOL Drone

export interface ComponentExplodedOffset {
  dx: number;
  dy: number;
  dz: number;
}

// Logical displacement vectors for each physical component during exploded view
// Components move along logical assembly axes (lateral X for wings/booms, vertical Y for props/motors/avionics, Z for nose/aft pusher)
export const COMPONENT_EXPLODED_OFFSETS: Record<string, ComponentExplodedOffset> = {
  // Fuselage stays at center [0, 0.20, 0.15] as structural anchor
  'airframe': { dx: 0, dy: 0, dz: 0 },
  'fuselage': { dx: 0, dy: 0, dz: 0 },

  // Wings separate laterally along X
  'starboard-wing': { dx: 0.70, dy: 0, dz: 0 },
  'port-wing': { dx: -0.70, dy: 0, dz: 0 },
  'right_wing': { dx: 0.70, dy: 0, dz: 0 },
  'left_wing': { dx: -0.70, dy: 0, dz: 0 },

  // Control surfaces separate slightly aft from wings/fins
  'servos': { dx: 0.70, dy: 0, dz: -0.22 },
  'servo': { dx: 0.70, dy: 0, dz: -0.22 },
  'port-aileron': { dx: -0.70, dy: 0, dz: -0.22 },
  'starboard-aileron': { dx: 0.70, dy: 0, dz: -0.22 },
  'port-ruddervator': { dx: -0.32, dy: 0.15, dz: -0.55 },
  'starboard-ruddervator': { dx: 0.32, dy: 0.15, dz: -0.55 },

  // Booms separate laterally
  'port-boom': { dx: -0.45, dy: 0, dz: 0 },
  'starboard-boom': { dx: 0.45, dy: 0, dz: 0 },

  // VTOL Motors lift upward and outward
  'vtol-motors': { dx: 0.45, dy: 0.32, dz: 0.15 },
  'vtol_motor': { dx: 0.45, dy: 0.32, dz: 0.15 },
  'vtol-motor-fl': { dx: -0.45, dy: 0.32, dz: 0.15 },
  'vtol-motor-fr': { dx: 0.45, dy: 0.32, dz: 0.15 },
  'vtol-motor-rl': { dx: -0.45, dy: 0.32, dz: -0.15 },
  'vtol-motor-rr': { dx: 0.45, dy: 0.32, dz: -0.15 },

  // VTOL Propellers lift higher upward above motors
  'vtol-props': { dx: 0.45, dy: 0.68, dz: 0.15 },
  'vtol_propeller': { dx: 0.45, dy: 0.68, dz: 0.15 },
  'vtol-prop-fl': { dx: -0.45, dy: 0.68, dz: 0.15 },
  'vtol-prop-fr': { dx: 0.45, dy: 0.68, dz: 0.15 },
  'vtol-prop-rl': { dx: -0.45, dy: 0.68, dz: -0.15 },
  'vtol-prop-rr': { dx: 0.45, dy: 0.68, dz: -0.15 },

  // VTOL ESCs drop downward below motors
  'vtol-escs': { dx: 0.45, dy: -0.28, dz: 0.10 },
  'vtol_esc': { dx: 0.45, dy: -0.28, dz: 0.10 },
  'vtol-esc-fl': { dx: -0.45, dy: -0.28, dz: 0.10 },
  'vtol-esc-fr': { dx: 0.45, dy: -0.28, dz: 0.10 },
  'vtol-esc-rl': { dx: -0.45, dy: -0.28, dz: -0.10 },
  'vtol-esc-rr': { dx: 0.45, dy: -0.28, dz: -0.10 },

  // Cruise propulsion moves rearward along -Z
  'cruise-motor': { dx: 0, dy: 0, dz: -0.45 },
  'cruise_motor': { dx: 0, dy: 0, dz: -0.45 },
  'cruise-esc': { dx: 0, dy: -0.25, dz: -0.25 },
  'cruise_esc': { dx: 0, dy: -0.25, dz: -0.25 },
  'cruise-prop': { dx: 0, dy: 0, dz: -0.85 },
  'cruise_propeller': { dx: 0, dy: 0, dz: -0.85 },

  // Inverted V-tail fins
  'port-vfin': { dx: -0.32, dy: 0.15, dz: -0.40 },
  'starboard-vfin': { dx: 0.32, dy: 0.15, dz: -0.40 },

  // Canopy & Avionics
  'cockpit-canopy': { dx: 0, dy: 0.35, dz: 0.15 },
  'flight-controller': { dx: 0, dy: 0.50, dz: 0.20 },
  'flight_controller': { dx: 0, dy: 0.50, dz: 0.20 },
  'battery': { dx: 0, dy: 0.35, dz: -0.05 },
  'pdb': { dx: 0, dy: -0.30, dz: 0.12 },
  'power-module': { dx: 0.22, dy: 0.25, dz: 0.15 },
  'power_module': { dx: 0.22, dy: 0.25, dz: 0.15 },
  'bec': { dx: -0.22, dy: 0.25, dz: 0.15 },
  'barometer': { dx: 0.25, dy: 0.40, dz: 0.10 },
  'wiring': { dx: 0.30, dy: 0.15, dz: 0 },

  // Forward Payload & Sensors
  'pitot-airspeed': { dx: 0, dy: 0, dz: 0.60 },
  'pitot_airspeed': { dx: 0, dy: 0, dz: 0.60 },
  'gimbal-camera': { dx: 0, dy: -0.38, dz: 0.35 },
  'camera_gimbal': { dx: 0, dy: -0.38, dz: 0.35 },
  'gps-compass': { dx: 0, dy: 0.65, dz: -0.15 },
  'gps_compass': { dx: 0, dy: 0.65, dz: -0.15 },

  // Antennas
  'telemetry': { dx: -0.20, dy: -0.35, dz: -0.15 },
  'rc-receiver': { dx: 0.25, dy: 0.25, dz: 0.10 },
  'rc_receiver': { dx: 0.25, dy: 0.25, dz: 0.10 },

  // Landing Gear
  'starboard-skid': { dx: 0.18, dy: -0.35, dz: 0 },
  'port-skid': { dx: -0.18, dy: -0.35, dz: 0 },
  'landing_gear': { dx: 0.18, dy: -0.35, dz: 0 },
  'landing-gear': { dx: 0.18, dy: -0.35, dz: 0 },
};

// Returns the 3D focus position for a component given assembled vs exploded state
export function getComponentTargetPosition(
  componentId: string,
  baseHotspot: [number, number, number],
  isExploded: boolean
): [number, number, number] {
  if (!isExploded) return baseHotspot;

  const offset = COMPONENT_EXPLODED_OFFSETS[componentId] || { dx: 0, dy: 0, dz: 0 };
  return [
    baseHotspot[0] + offset.dx,
    baseHotspot[1] + offset.dy,
    baseHotspot[2] + offset.dz,
  ];
}

// Sub-part position table for individual components (e.g. 4 individual VTOL motors/props/ESCs, wings, stabilizers)
export const SUBPART_POSITIONS: Record<string, { base: [number, number, number]; offset: [number, number, number] }> = {
  'VTOL Lift Motor (Front-Left)': { base: [-0.82, 0.20, 0.92], offset: [-0.45, 0.32, 0.15] },
  'VTOL Lift Motor (Front-Right)': { base: [0.82, 0.20, 0.92], offset: [0.45, 0.32, 0.15] },
  'VTOL Lift Motor (Rear-Left)': { base: [-0.82, 0.20, -0.92], offset: [-0.45, 0.32, -0.15] },
  'VTOL Lift Motor (Rear-Right)': { base: [0.82, 0.20, -0.92], offset: [0.45, 0.32, -0.15] },
  'VTOL 60A ESC (Front-Left)': { base: [-0.82, 0.16, 0.85], offset: [-0.45, -0.28, 0.10] },
  'VTOL 60A ESC (Front-Right)': { base: [0.82, 0.16, 0.85], offset: [0.45, -0.28, 0.10] },
  'VTOL 60A ESC (Rear-Left)': { base: [-0.82, 0.16, -0.85], offset: [-0.45, -0.28, -0.10] },
  'VTOL 60A ESC (Rear-Right)': { base: [0.82, 0.16, -0.85], offset: [0.45, -0.28, -0.10] },
  'VTOL Carbon Propeller (Front-Left)': { base: [-0.82, 0.28, 0.92], offset: [-0.45, 0.68, 0.15] },
  'VTOL Carbon Propeller (Front-Right)': { base: [0.82, 0.28, 0.92], offset: [0.45, 0.68, 0.15] },
  'VTOL Carbon Propeller (Rear-Left)': { base: [-0.82, 0.28, -0.92], offset: [-0.45, 0.68, -0.15] },
  'VTOL Carbon Propeller (Rear-Right)': { base: [0.82, 0.28, -0.92], offset: [0.45, 0.68, -0.15] },
  'Starboard Fixed Wing': { base: [1.15, 0.20, 0.05], offset: [0.70, 0, 0] },
  'Starboard Fixed Wing (Right)': { base: [1.15, 0.20, 0.05], offset: [0.70, 0, 0] },
  'Port Fixed Wing': { base: [-1.15, 0.20, 0.05], offset: [-0.70, 0, 0] },
  'Port Fixed Wing (Left)': { base: [-1.15, 0.20, 0.05], offset: [-0.70, 0, 0] },
  'High-Vis Wing Tip (Starboard)': { base: [1.95, 0.20, 0.05], offset: [0.70, 0, 0] },
  'High-Vis Wing Tip (Port)': { base: [-1.95, 0.20, 0.05], offset: [-0.70, 0, 0] },
  'Main Aircraft Fuselage': { base: [0, 0.20, 0.15], offset: [0, 0, 0] },
  'Aerodynamic Nose Fairing': { base: [0, 0.20, 0.82], offset: [0, 0, 0] },
  'Forward Nose Radome': { base: [0, 0.20, 1.06], offset: [0, 0, 0] },
  'Aft Fuselage Tail Fairing': { base: [0, 0.20, -0.62], offset: [0, 0, 0] },
  'Forward Cruise Motor (Pusher)': { base: [0, 0.20, -1.08], offset: [0, 0, -0.45] },
  'Cruise 80A ESC': { base: [0, 0.18, -0.75], offset: [0, -0.25, -0.25] },
  'Cruise Pusher Propeller': { base: [0, 0.20, -1.20], offset: [0, 0, -0.85] },
  'Cruise Pusher Propeller & Aerodynamic Spinner': { base: [0, 0.20, -1.20], offset: [0, 0, -0.85] },
  'Cube Orange+ Autopilot Flight Controller': { base: [0, 0.21, 0.30], offset: [0, 0.50, 0.20] },
  '6S 16,000mAh LiPo Battery Pack': { base: [0, 0.19, -0.05], offset: [0, 0.35, -0.05] },
  'Power Distribution Board (PDB)': { base: [0, 0.14, 0.12], offset: [0, -0.30, 0.12] },
  'Current & Voltage Sensor Module': { base: [0, 0.16, 0.19], offset: [0.22, 0.25, 0.15] },
  'Dual DC-DC / BEC Regulators': { base: [-0.08, 0.20, 0.15], offset: [-0.22, 0.25, 0.15] },
  'Digital Atmospheric Barometer': { base: [0.06, 0.21, 0.12], offset: [0.25, 0.40, 0.10] },
  'Silicone Wiring Harness & Connectors': { base: [0.35, 0.20, 0.05], offset: [0.30, 0.15, 0] },
  'EO/IR 3-Axis Thermal Rescue Gimbal': { base: [0, 0.10, 0.85], offset: [0, -0.38, 0.35] },
  'Digital Airspeed Sensor & Heated Pitot Tube': { base: [0, 0.20, 1.20], offset: [0, 0, 0.60] },
  'High-Precision GNSS / GPS + Compass Puck': { base: [0, 0.28, -0.15], offset: [0, 0.65, -0.15] },
  'Long-Range GCS Telemetry Antenna': { base: [-0.07, 0.11, -0.32], offset: [-0.20, -0.35, -0.15] },
  'RC Emergency Override Receiver': { base: [0.14, 0.23, 0.15], offset: [0.25, 0.25, 0.10] },
  'Inverted V-Tail (Starboard)': { base: [0.18, 0.20, -0.85], offset: [0.32, 0.15, -0.40] },
  'Inverted V-Tail (Port)': { base: [-0.18, 0.20, -0.85], offset: [-0.32, 0.15, -0.40] },
  'Starboard Aileron Servo & Surface': { base: [1.70, 0.20, -0.12], offset: [0.70, 0, -0.22] },
  'Port Aileron Servo & Surface': { base: [-1.70, 0.20, -0.12], offset: [-0.70, 0, -0.22] },
  'Starboard Ruddervator Servo & Surface': { base: [0.18, 0.20, -0.95], offset: [0.32, 0.15, -0.55] },
  'Port Ruddervator Servo & Surface': { base: [-0.18, 0.20, -0.95], offset: [-0.32, 0.15, -0.55] },
  'Carbon Landing Skid (Starboard)': { base: [0.14, 0.07, 0], offset: [0.18, -0.35, 0] },
  'Starboard Landing Skid': { base: [0.14, 0.07, 0], offset: [0.18, -0.35, 0] },
  'Carbon Landing Skid (Port)': { base: [-0.14, 0.07, 0], offset: [-0.18, -0.35, 0] },
  'Port Landing Skid': { base: [-0.14, 0.07, 0], offset: [-0.18, -0.35, 0] },
  'Carbon VTOL Boom (Starboard)': { base: [0.82, 0.20, 0], offset: [0.45, 0, 0] },
  'Carbon VTOL Boom (Port)': { base: [-0.82, 0.20, 0], offset: [-0.45, 0, 0] },
};

// Gets the precise 3D camera focus coordinates for a specific named sub-part
export function getSubpartTargetPosition(
  partName: string | null | undefined,
  componentId: string,
  baseHotspot: [number, number, number],
  isExploded: boolean
): [number, number, number] {
  if (partName && SUBPART_POSITIONS[partName]) {
    const item = SUBPART_POSITIONS[partName];
    if (!isExploded) return item.base;
    return [
      item.base[0] + item.offset[0],
      item.base[1] + item.offset[1],
      item.base[2] + item.offset[2],
    ];
  }
  return getComponentTargetPosition(componentId, baseHotspot, isExploded);
}
