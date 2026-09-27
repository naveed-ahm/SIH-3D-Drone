import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FlightMode, ViewerSettings } from '../../types/drone';

interface DroneModelProps {
  flightMode: FlightMode;
  selectedComponentId: string | null;
  selectedPartName?: string | null;
  isolatedComponentId: string | null;
  hoveredComponentId: string | null;
  hoveredPartName?: string | null;
  onSelectComponent: (id: string, partName?: string) => void;
  onHoverComponent: (id: string | null, partName?: string | null) => void;
  settings: ViewerSettings;
  isExploded?: boolean;
}

// Definition of guide line segments connecting separated parts back to their roots
interface GuideLineDefinition {
  id: string;
  componentId: string;
  from: [number, number, number];
  offset: [number, number, number];
}

const GUIDE_LINES_DATA: GuideLineDefinition[] = [
  // Wings & control surfaces
  { id: 'gl-rwing', componentId: 'right_wing', from: [0.20, 0.20, 0.05], offset: [0.70, 0, 0] },
  { id: 'gl-lwing', componentId: 'left_wing', from: [-0.20, 0.20, 0.05], offset: [-0.70, 0, 0] },
  { id: 'gl-raileron', componentId: 'servo', from: [1.15, 0.20, -0.17], offset: [0.70, 0, -0.22] },
  { id: 'gl-laileron', componentId: 'servo', from: [-1.15, 0.20, -0.17], offset: [-0.70, 0, -0.22] },

  // Booms
  { id: 'gl-rboom', componentId: 'right_wing', from: [0.82, 0.20, 0], offset: [0.45, 0, 0] },
  { id: 'gl-lboom', componentId: 'left_wing', from: [-0.82, 0.20, 0], offset: [-0.45, 0, 0] },

  // VTOL Motors
  { id: 'gl-mfl', componentId: 'vtol_motor', from: [-0.82, 0.20, 0.92], offset: [-0.45, 0.32, 0.15] },
  { id: 'gl-mfr', componentId: 'vtol_motor', from: [0.82, 0.20, 0.92], offset: [0.45, 0.32, 0.15] },
  { id: 'gl-mrl', componentId: 'vtol_motor', from: [-0.82, 0.20, -0.92], offset: [-0.45, 0.32, -0.15] },
  { id: 'gl-mrr', componentId: 'vtol_motor', from: [0.82, 0.20, -0.92], offset: [0.45, 0.32, -0.15] },

  // VTOL Propellers (from motor to prop)
  { id: 'gl-pfl', componentId: 'vtol_propeller', from: [-0.82, 0.28, 0.92], offset: [-0.45, 0.68, 0.15] },
  { id: 'gl-pfr', componentId: 'vtol_propeller', from: [0.82, 0.28, 0.92], offset: [0.45, 0.68, 0.15] },
  { id: 'gl-prl', componentId: 'vtol_propeller', from: [-0.82, 0.28, -0.92], offset: [-0.45, 0.68, -0.15] },
  { id: 'gl-prr', componentId: 'vtol_propeller', from: [0.82, 0.28, -0.92], offset: [0.45, 0.68, -0.15] },

  // VTOL ESCs (under booms)
  { id: 'gl-escfl', componentId: 'vtol_esc', from: [-0.82, 0.16, 0.85], offset: [-0.45, -0.28, 0.10] },
  { id: 'gl-escfr', componentId: 'vtol_esc', from: [0.82, 0.16, 0.85], offset: [0.45, -0.28, 0.10] },
  { id: 'gl-escrl', componentId: 'vtol_esc', from: [-0.82, 0.16, -0.85], offset: [-0.45, -0.28, -0.10] },
  { id: 'gl-escrr', componentId: 'vtol_esc', from: [0.82, 0.16, -0.85], offset: [0.45, -0.28, -0.10] },

  // Cruise system
  { id: 'gl-cmotor', componentId: 'cruise_motor', from: [0, 0.20, -1.08], offset: [0, 0, -0.45] },
  { id: 'gl-cesc', componentId: 'cruise_esc', from: [0, 0.18, -0.75], offset: [0, -0.25, -0.25] },
  { id: 'gl-cprop', componentId: 'cruise_propeller', from: [0, 0.20, -1.20], offset: [0, 0, -0.85] },

  // Inverted V-tail
  { id: 'gl-rvfin', componentId: 'fuselage', from: [0.18, 0.20, -0.85], offset: [0.32, 0.15, -0.40] },
  { id: 'gl-lvfin', componentId: 'fuselage', from: [-0.18, 0.20, -0.85], offset: [-0.32, 0.15, -0.40] },
  { id: 'gl-rrudd', componentId: 'servo', from: [0.18, 0.20, -0.95], offset: [0.32, 0.15, -0.58] },
  { id: 'gl-lrudd', componentId: 'servo', from: [-0.18, 0.20, -0.95], offset: [-0.32, 0.15, -0.58] },

  // Avionics & Internal deck
  { id: 'gl-canopy', componentId: 'fuselage', from: [0, 0.255, 0.52], offset: [0, 0.35, 0.15] },
  { id: 'gl-fc', componentId: 'flight_controller', from: [0, 0.21, 0.30], offset: [0, 0.50, 0.20] },
  { id: 'gl-battery', componentId: 'battery', from: [0, 0.19, -0.05], offset: [0, 0.35, -0.05] },
  { id: 'gl-pdb', componentId: 'pdb', from: [0, 0.14, 0.12], offset: [0, -0.30, 0.12] },
  { id: 'gl-pm', componentId: 'power_module', from: [0, 0.16, 0.19], offset: [0.22, 0.25, 0.15] },
  { id: 'gl-bec', componentId: 'bec', from: [-0.08, 0.20, 0.15], offset: [-0.22, 0.25, 0.15] },
  { id: 'gl-baro', componentId: 'barometer', from: [0.06, 0.21, 0.12], offset: [0.25, 0.40, 0.10] },
  { id: 'gl-wiring', componentId: 'wiring', from: [0.35, 0.20, 0.05], offset: [0.30, 0.15, 0] },

  // Payloads & Sensors
  { id: 'gl-gimbal', componentId: 'camera_gimbal', from: [0, 0.10, 0.85], offset: [0, -0.38, 0.35] },
  { id: 'gl-pitot', componentId: 'pitot_airspeed', from: [0, 0.20, 1.20], offset: [0, 0, 0.60] },
  { id: 'gl-gps', componentId: 'gps_compass', from: [0, 0.28, -0.15], offset: [0, 0.65, -0.15] },
  { id: 'gl-telem', componentId: 'telemetry', from: [-0.07, 0.11, -0.32], offset: [-0.20, -0.35, -0.15] },
  { id: 'gl-rc', componentId: 'rc_receiver', from: [0.14, 0.23, 0.15], offset: [0.25, 0.25, 0.10] },

  // Landing gear
  { id: 'gl-rskid', componentId: 'landing_gear', from: [0.14, 0.07, 0], offset: [0.18, -0.35, 0] },
  { id: 'gl-lskid', componentId: 'landing_gear', from: [-0.14, 0.07, 0], offset: [-0.18, -0.35, 0] },
];

export const DroneModel: React.FC<DroneModelProps> = ({
  flightMode,
  selectedComponentId,
  selectedPartName,
  isolatedComponentId,
  hoveredComponentId,
  hoveredPartName,
  onSelectComponent,
  onHoverComponent,
  settings,
  isExploded = false
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Dynamic animated progress for exploded transition (0.0 = assembled, 1.0 = fully exploded)
  const explodeProgress = useRef(0);

  // Group references for physical animated displacement
  const rightWingGroupRef = useRef<THREE.Group>(null);
  const leftWingGroupRef = useRef<THREE.Group>(null);
  const rightAileronRef = useRef<THREE.Group>(null);
  const leftAileronRef = useRef<THREE.Group>(null);

  // VTOL Motors
  const vtolMotorFLRef = useRef<THREE.Group>(null);
  const vtolMotorFRRef = useRef<THREE.Group>(null);
  const vtolMotorRLRef = useRef<THREE.Group>(null);
  const vtolMotorRRRef = useRef<THREE.Group>(null);

  // VTOL Propellers (translation) and their spinning child hubs
  const vtolPropFLRef = useRef<THREE.Group>(null);
  const vtolPropFRRef = useRef<THREE.Group>(null);
  const vtolPropRLRef = useRef<THREE.Group>(null);
  const vtolPropRRRef = useRef<THREE.Group>(null);
  const vtolPropSpinFLRef = useRef<THREE.Group>(null);
  const vtolPropSpinFRRef = useRef<THREE.Group>(null);
  const vtolPropSpinRLRef = useRef<THREE.Group>(null);
  const vtolPropSpinRRRef = useRef<THREE.Group>(null);

  // VTOL ESCs
  const vtolEscFLRef = useRef<THREE.Group>(null);
  const vtolEscFRRef = useRef<THREE.Group>(null);
  const vtolEscRLRef = useRef<THREE.Group>(null);
  const vtolEscRRRef = useRef<THREE.Group>(null);

  // Cruise Motor & Propeller
  const cruiseMotorGroupRef = useRef<THREE.Group>(null);
  const cruisePropGroupRef = useRef<THREE.Group>(null);
  const cruisePropSpinRef = useRef<THREE.Group>(null);
  const cruiseEscGroupRef = useRef<THREE.Group>(null);

  // Tail
  const rightVFinGroupRef = useRef<THREE.Group>(null);
  const leftVFinGroupRef = useRef<THREE.Group>(null);
  const rightRuddervatorRef = useRef<THREE.Group>(null);
  const leftRuddervatorRef = useRef<THREE.Group>(null);

  // Avionics & Payloads
  const cockpitCanopyRef = useRef<THREE.Group>(null);
  const flightControllerRef = useRef<THREE.Group>(null);
  const batteryRef = useRef<THREE.Group>(null);
  const pdbRef = useRef<THREE.Group>(null);
  const powerModuleRef = useRef<THREE.Group>(null);
  const becRef = useRef<THREE.Group>(null);
  const barometerRef = useRef<THREE.Group>(null);
  const wiringRef = useRef<THREE.Group>(null);
  const gimbalGroupRef = useRef<THREE.Group>(null);
  const gimbalYawRef = useRef<THREE.Group>(null);
  const gimbalPitchRef = useRef<THREE.Group>(null);
  const pitotRef = useRef<THREE.Group>(null);
  const gpsRef = useRef<THREE.Group>(null);
  const telemetryRef = useRef<THREE.Group>(null);
  const rcReceiverRef = useRef<THREE.Group>(null);

  // Landing gear
  const rightSkidRef = useRef<THREE.Group>(null);
  const leftSkidRef = useRef<THREE.Group>(null);

  // Dynamic exploded assembly guide lines buffer ref
  const guideLinesRef = useRef<THREE.LineSegments>(null);

  // Material helper with hover, isolation, and selection highlights
  const getMaterialProps = (
    componentId: string, 
    partName: string,
    defaultColor: string, 
    metalness = 0.3, 
    roughness = 0.4
  ) => {
    const norm = (id: string | null | undefined) => {
      if (!id) return '';
      return id.replace(/-/g, '_');
    };

    const targetIdNorm = norm(componentId);
    const selectedNorm = norm(selectedComponentId);
    const hoveredNorm = norm(hoveredComponentId);
    const isolatedNorm = norm(isolatedComponentId);

    const isComponentSelected = selectedNorm !== '' && selectedNorm === targetIdNorm;
    const isComponentHovered = hoveredNorm !== '' && hoveredNorm === targetIdNorm;
    const isIsolated = isolatedNorm !== '' && isolatedNorm === targetIdNorm;
    const isAnyIsolated = isolatedComponentId !== null;
    const isAnySelected = selectedComponentId !== null;

    // Subpart specificity:
    // When hovering or selecting, ONLY the physical subpart matching partName highlights!
    const isSelected = isComponentSelected && (!selectedPartName || selectedPartName === partName);
    const isHovered = isComponentHovered && !isSelected && (!hoveredPartName || hoveredPartName === partName);

    let opacity = 1.0;
    let transparent = false;
    let emissive = new THREE.Color(0x000000);
    let emissiveIntensity = 0;
    let color = defaultColor;

    if (isAnyIsolated) {
      if (isIsolated) {
        opacity = 1.0;
        emissive = new THREE.Color(0x00e5ff);
        emissiveIntensity = 0.70;
      } else {
        opacity = 0.08;
        transparent = true;
      }
    } else if (isSelected) {
      // Selected physical component outline/emissive glow
      emissive = new THREE.Color(0x00e5ff);
      emissiveIntensity = 0.85;
      color = '#ffffff';
      opacity = 1.0;
    } else if (isHovered) {
      // Hovered physical component subtle outline/emissive glow
      emissive = new THREE.Color(0x38bdf8);
      emissiveIntensity = 0.50;
    } else if (isAnySelected) {
      // Subdued state for non-selected components when another component is selected
      opacity = 0.70;
      transparent = true;
    }

    if (settings.wireframeMode) {
      return {
        color: isSelected ? '#00e5ff' : isHovered ? '#38bdf8' : '#64748b',
        wireframe: true,
        transparent,
        opacity: transparent ? opacity : 0.85
      };
    }

    return {
      color,
      metalness,
      roughness,
      emissive,
      emissiveIntensity,
      transparent,
      opacity,
      depthWrite: !transparent
    };
  };

  // Helper callbacks for raycast pointer events (clean enter/leave avoids internal bubbling reset)
  const handlePointerEnter = (e: any, componentId: string, partName: string) => {
    e.stopPropagation();
    onHoverComponent(componentId, partName);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = (e: any) => {
    e.stopPropagation();
    onHoverComponent(null, null);
    document.body.style.cursor = 'auto';
  };

  const handlePointerOver = handlePointerEnter;
  const handlePointerOut = handlePointerLeave;

  const handleClick = (e: any, componentId: string, partName: string) => {
    e.stopPropagation();
    onSelectComponent(componentId, partName);
  };

  // Frame animation loop: smooth exploded lerping, spinning propellers, gimbal motion, and guide lines
  useFrame((state, delta) => {
    // 1. Smooth Dampening toward target exploded state
    const target = isExploded ? 1.0 : 0.0;
    explodeProgress.current = THREE.MathUtils.damp(
      explodeProgress.current,
      target,
      4.8,
      delta
    );

    const p = explodeProgress.current;
    // Cubic smoothstep easing
    const eased = p * p * (3 - 2 * p);

    // Subtle breath floating (damped out when exploded to keep inspection solid)
    if (groupRef.current) {
      const floatAmp = 0.008 * (1 - p * 0.8);
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * floatAmp + 0.02;
    }

    // 2. Update Physical Component Group Positions along logical separation vectors
    // Wings & Ailerons
    if (rightWingGroupRef.current) {
      rightWingGroupRef.current.position.set(1.15 + 0.70 * eased, 0.20, 0.05);
    }
    if (rightAileronRef.current) {
      rightAileronRef.current.position.set(0.55, -0.005, -0.17 - 0.22 * eased);
    }
    if (leftWingGroupRef.current) {
      leftWingGroupRef.current.position.set(-1.15 - 0.70 * eased, 0.20, 0.05);
    }
    if (leftAileronRef.current) {
      leftAileronRef.current.position.set(-0.55, -0.005, -0.17 - 0.22 * eased);
    }

    // VTOL Lift Motors
    if (vtolMotorFLRef.current) {
      vtolMotorFLRef.current.position.set(-0.82 - 0.45 * eased, 0.20 + 0.32 * eased, 0.92 + 0.15 * eased);
    }
    if (vtolMotorFRRef.current) {
      vtolMotorFRRef.current.position.set(0.82 + 0.45 * eased, 0.20 + 0.32 * eased, 0.92 + 0.15 * eased);
    }
    if (vtolMotorRLRef.current) {
      vtolMotorRLRef.current.position.set(-0.82 - 0.45 * eased, 0.20 + 0.32 * eased, -0.92 - 0.15 * eased);
    }
    if (vtolMotorRRRef.current) {
      vtolMotorRRRef.current.position.set(0.82 + 0.45 * eased, 0.20 + 0.32 * eased, -0.92 - 0.15 * eased);
    }

    // VTOL Propellers (lift higher than motors)
    if (vtolPropFLRef.current) {
      vtolPropFLRef.current.position.set(-0.82 - 0.45 * eased, 0.28 + 0.68 * eased, 0.92 + 0.15 * eased);
    }
    if (vtolPropFRRef.current) {
      vtolPropFRRef.current.position.set(0.82 + 0.45 * eased, 0.28 + 0.68 * eased, 0.92 + 0.15 * eased);
    }
    if (vtolPropRLRef.current) {
      vtolPropRLRef.current.position.set(-0.82 - 0.45 * eased, 0.28 + 0.68 * eased, -0.92 - 0.15 * eased);
    }
    if (vtolPropRRRef.current) {
      vtolPropRRRef.current.position.set(0.82 + 0.45 * eased, 0.28 + 0.68 * eased, -0.92 - 0.15 * eased);
    }

    // VTOL ESCs (drop downward below booms)
    if (vtolEscFLRef.current) {
      vtolEscFLRef.current.position.set(-0.82 - 0.45 * eased, 0.16 - 0.28 * eased, 0.85 + 0.10 * eased);
    }
    if (vtolEscFRRef.current) {
      vtolEscFRRef.current.position.set(0.82 + 0.45 * eased, 0.16 - 0.28 * eased, 0.85 + 0.10 * eased);
    }
    if (vtolEscRLRef.current) {
      vtolEscRLRef.current.position.set(-0.82 - 0.45 * eased, 0.16 - 0.28 * eased, -0.85 - 0.10 * eased);
    }
    if (vtolEscRRRef.current) {
      vtolEscRRRef.current.position.set(0.82 + 0.45 * eased, 0.16 - 0.28 * eased, -0.85 - 0.10 * eased);
    }

    // Cruise Motor & Pusher Propeller (move rearward along -Z)
    if (cruiseMotorGroupRef.current) {
      cruiseMotorGroupRef.current.position.set(0, 0.20, -1.08 - 0.45 * eased);
    }
    if (cruisePropGroupRef.current) {
      cruisePropGroupRef.current.position.set(0, 0.20, -1.20 - 0.85 * eased);
    }
    if (cruiseEscGroupRef.current) {
      cruiseEscGroupRef.current.position.set(0, 0.18 - 0.25 * eased, -0.75 - 0.25 * eased);
    }

    // Inverted V-tail
    if (rightVFinGroupRef.current) {
      rightVFinGroupRef.current.position.set(0.18 + 0.32 * eased, 0.20 + 0.15 * eased, -0.85 - 0.40 * eased);
    }
    if (leftVFinGroupRef.current) {
      leftVFinGroupRef.current.position.set(-0.18 - 0.32 * eased, 0.20 + 0.15 * eased, -0.85 - 0.40 * eased);
    }
    if (rightRuddervatorRef.current) {
      rightRuddervatorRef.current.position.set(0, 0, -0.10 - 0.15 * eased);
    }
    if (leftRuddervatorRef.current) {
      leftRuddervatorRef.current.position.set(0, 0, -0.10 - 0.15 * eased);
    }

    // Canopy & Avionics Tray
    if (cockpitCanopyRef.current) {
      cockpitCanopyRef.current.position.set(0, 0.255 + 0.35 * eased, 0.52 + 0.15 * eased);
    }
    if (flightControllerRef.current) {
      flightControllerRef.current.position.set(0, 0.21 + 0.50 * eased, 0.30 + 0.20 * eased);
    }
    if (batteryRef.current) {
      batteryRef.current.position.set(0, 0.19 + 0.35 * eased, -0.05 - 0.05 * eased);
    }
    if (pdbRef.current) {
      pdbRef.current.position.set(0, 0.14 - 0.30 * eased, 0.12 + 0.12 * eased);
    }
    if (powerModuleRef.current) {
      powerModuleRef.current.position.set(0 + 0.22 * eased, 0.16 + 0.25 * eased, 0.19 + 0.15 * eased);
    }
    if (becRef.current) {
      becRef.current.position.set(-0.08 - 0.22 * eased, 0.20 + 0.25 * eased, 0.15 + 0.15 * eased);
    }
    if (barometerRef.current) {
      barometerRef.current.position.set(0.06 + 0.25 * eased, 0.21 + 0.40 * eased, 0.12 + 0.10 * eased);
    }
    if (wiringRef.current) {
      wiringRef.current.position.set(0.35 + 0.30 * eased, 0.20 + 0.15 * eased, 0.05);
    }

    // Payloads, Antennas & Sensors
    if (gimbalGroupRef.current) {
      gimbalGroupRef.current.position.set(0, 0.10 - 0.38 * eased, 0.85 + 0.35 * eased);
    }
    if (pitotRef.current) {
      pitotRef.current.position.set(0, 0.20, 1.20 + 0.60 * eased);
    }
    if (gpsRef.current) {
      gpsRef.current.position.set(0, 0.28 + 0.65 * eased, -0.15 - 0.15 * eased);
    }
    if (telemetryRef.current) {
      telemetryRef.current.position.set(-0.07 - 0.20 * eased, 0.11 - 0.35 * eased, -0.32 - 0.15 * eased);
    }
    if (rcReceiverRef.current) {
      rcReceiverRef.current.position.set(0.14 + 0.25 * eased, 0.23 + 0.25 * eased, 0.15 + 0.10 * eased);
    }

    // Landing gear
    if (rightSkidRef.current) {
      rightSkidRef.current.position.set(0.14 + 0.18 * eased, 0.07 - 0.35 * eased, 0);
    }
    if (leftSkidRef.current) {
      leftSkidRef.current.position.set(-0.14 - 0.18 * eased, 0.07 - 0.35 * eased, 0);
    }

    // 3. Propeller Spin Animations
    if (settings.animatePropellers && !isExploded) {
      let vtolSpin = 0;
      let cruiseSpin = 0;

      if (flightMode === 'VTOL') {
        vtolSpin = delta * 45;
        cruiseSpin = 0;
      } else if (flightMode === 'TRANSITION') {
        vtolSpin = delta * 35;
        cruiseSpin = delta * 25;
      } else {
        // CRUISE
        vtolSpin = 0;
        cruiseSpin = delta * 50;
      }

      if (vtolPropSpinFLRef.current) vtolPropSpinFLRef.current.rotation.y += vtolSpin;
      if (vtolPropSpinFRRef.current) vtolPropSpinFRRef.current.rotation.y -= vtolSpin;
      if (vtolPropSpinRLRef.current) vtolPropSpinRLRef.current.rotation.y -= vtolSpin;
      if (vtolPropSpinRRRef.current) vtolPropSpinRRRef.current.rotation.y += vtolSpin;

      if (cruisePropSpinRef.current) cruisePropSpinRef.current.rotation.z += cruiseSpin;
    }

    // 4. Subtle Gimbal Target Search Tracking Motion (when assembled)
    if (!isExploded && gimbalYawRef.current && gimbalPitchRef.current) {
      const t = state.clock.elapsedTime * 0.8;
      gimbalYawRef.current.rotation.y = Math.sin(t) * 0.45;
      gimbalPitchRef.current.rotation.x = -0.25 + Math.sin(t * 0.6) * 0.20;
    }

    // 5. Dynamic Exploded Connecting Guide Lines Buffer Update
    if (guideLinesRef.current && isExploded && p > 0.02) {
      const linePositions = guideLinesRef.current.geometry.attributes.position.array as Float32Array;
      let idx = 0;

      GUIDE_LINES_DATA.forEach((line) => {
        // Start point at base root
        linePositions[idx++] = line.from[0];
        linePositions[idx++] = line.from[1];
        linePositions[idx++] = line.from[2];

        // End point displaced by current progress
        linePositions[idx++] = line.from[0] + line.offset[0] * eased;
        linePositions[idx++] = line.from[1] + line.offset[1] * eased;
        linePositions[idx++] = line.from[2] + line.offset[2] * eased;
      });

      guideLinesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Pre-allocated Float32Array for connecting guide lines
  const guideLinesBuffer = useMemo(() => {
    return new Float32Array(GUIDE_LINES_DATA.length * 6);
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Dynamic Exploded View Connecting Guide Lines */}
      <lineSegments ref={guideLinesRef} visible={isExploded}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[guideLinesBuffer, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </lineSegments>

      {/* ========================================================================= */}
      {/* 1. HORIZONTAL ELONGATED STREAMLINED AIRCRAFT FUSELAGE                     */}
      {/* ========================================================================= */}
      <group name="Fuselage_Group">
        {/* Main Central Aerodynamic Fuselage Hull (Anchor) */}
        <mesh 
          name="Fuselage"
          position={[0, 0.20, 0.15]} 
          castShadow 
          receiveShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.32, 0.135, 1.05]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f8fafc', 0.2, 0.35)} 
          />
        </mesh>

        {/* Upper Fuselage Curved Aerodynamic Spine */}
        <mesh 
          position={[0, 0.26, 0.15]} 
          castShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.26, 0.035, 1.0]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f8fafc', 0.2, 0.35)} 
          />
        </mesh>

        {/* Lower Ventral Fairing */}
        <mesh 
          position={[0, 0.14, 0.15]} 
          castShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.26, 0.035, 1.0]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f1f5f9', 0.25, 0.35)} 
          />
        </mesh>

        {/* Aerodynamic Forward Nose Transition */}
        <mesh 
          name="FuselageNose"
          position={[0, 0.20, 0.82]} 
          castShadow
          receiveShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.24, 0.11, 0.32]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f8fafc', 0.25, 0.35)} 
          />
        </mesh>

        {/* Nose Radome Tip */}
        <mesh 
          name="NoseRadome"
          position={[0, 0.20, 1.06]} 
          rotation={[Math.PI / 2, 0, 0]} 
          castShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <cylinderGeometry args={[0.04, 0.11, 0.20, 24]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f1f5f9', 0.3, 0.3)} 
          />
        </mesh>

        {/* Radome Hemispherical Apex */}
        <mesh position={[0, 0.20, 1.16]} castShadow>
          <sphereGeometry args={[0.04, 20, 20]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#e2e8f0', 0.35, 0.3)} 
          />
        </mesh>

        {/* Aft Fuselage Tail Boom */}
        <mesh 
          name="FuselageAftFairing"
          position={[0, 0.20, -0.62]} 
          castShadow
          receiveShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.20, 0.10, 0.52]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#e2e8f0', 0.25, 0.4)} 
          />
        </mesh>

        {/* Aft Cruise Motor Transition Shroud */}
        <mesh 
          position={[0, 0.20, -0.96]} 
          rotation={[Math.PI / 2, 0, 0]} 
          castShadow
        >
          <cylinderGeometry args={[0.065, 0.09, 0.18, 24]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#cbd5e1', 0.4, 0.3)} 
          />
        </mesh>

        {/* Wing-to-Fuselage Fillets */}
        <mesh position={[-0.19, 0.20, 0.05]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.44]} />
          <meshStandardMaterial {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f8fafc', 0.2, 0.35)} />
        </mesh>
        <mesh position={[0.19, 0.20, 0.05]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.44]} />
          <meshStandardMaterial {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f8fafc', 0.2, 0.35)} />
        </mesh>

        {/* Dorsal Rescue Livery Stripe */}
        <mesh 
          name="FuselageStripe"
          position={[0, 0.279, 0.10]} 
          castShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.09, 0.005, 1.25]} />
          <meshStandardMaterial 
            {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#ff6200', 0.4, 0.3)} 
          />
        </mesh>

        {/* Rescue Cross Badge */}
        <group position={[0, 0.282, 0.30]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.05, 24]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.015, 0.065]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.065, 0.015]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>

        {/* Ventral NACA Radiator Cooling Scoop */}
        <mesh 
          name="CoolingIntake"
          position={[0, 0.12, 0.35]} 
          castShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.12, 0.02, 0.25]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Cockpit Canopy (Separates upward to reveal avionics deck) */}
      <group 
        ref={cockpitCanopyRef}
        position={[0, 0.255, 0.52]}
        onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.035, 0.32]} />
          <meshPhysicalMaterial 
            color="#0f172a" 
            transparent 
            opacity={0.65} 
            roughness={0.1} 
            metalness={0.85} 
            transmission={0.5}
            ior={1.4}
          />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 2. INTERNAL ELECTRONICS & POWER SYSTEMS                                  */}
      {/* ========================================================================= */}
      {/* Flight Controller (Autopilot Cube Orange+ / PX4) */}
      <group 
        ref={flightControllerRef}
        name="FlightController"
        position={[0, 0.21, 0.30]}
        onPointerOver={(e) => handlePointerOver(e, 'flight_controller', 'Cube Orange+ Autopilot Flight Controller')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'flight_controller', 'Cube Orange+ Autopilot Flight Controller')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.07, 0.03, 0.07]} />
          <meshStandardMaterial {...getMaterialProps('flight_controller', 'Cube Orange+ Autopilot Flight Controller', '#ff6200', 0.3, 0.3)} />
        </mesh>
        <mesh position={[0, 0.018, 0.02]}>
          <sphereGeometry args={[0.005, 8, 8]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* Main 6S 16,000mAh Battery Pack */}
      <group 
        ref={batteryRef}
        name="Battery"
        position={[0, 0.19, -0.05]}
        onPointerOver={(e) => handlePointerOver(e, 'battery', '6S 16,000mAh LiPo Battery Pack')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'battery', '6S 16,000mAh LiPo Battery Pack')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.11, 0.06, 0.24]} />
          <meshStandardMaterial {...getMaterialProps('battery', '6S 16,000mAh LiPo Battery Pack', '#0f172a', 0.5, 0.4)} />
        </mesh>
        {/* Yellow XT90 connector callout */}
        <mesh position={[0, 0, 0.13]}>
          <boxGeometry args={[0.025, 0.015, 0.02]} />
          <meshStandardMaterial color="#eab308" metalness={0.2} roughness={0.3} />
        </mesh>
      </group>

      {/* Power Distribution Board (PDB) */}
      <group 
        ref={pdbRef}
        name="PDB"
        position={[0, 0.14, 0.12]}
        onPointerOver={(e) => handlePointerOver(e, 'pdb', 'Power Distribution Board (PDB)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'pdb', 'Power Distribution Board (PDB)')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.08, 0.012, 0.08]} />
          <meshStandardMaterial {...getMaterialProps('pdb', 'Power Distribution Board (PDB)', '#0284c7', 0.8, 0.2)} />
        </mesh>
      </group>

      {/* Current & Voltage Sensor Module (Power Module) */}
      <group 
        ref={powerModuleRef}
        name="PowerModule"
        position={[0, 0.16, 0.19]}
        onPointerOver={(e) => handlePointerOver(e, 'power_module', 'Current & Voltage Sensor Module')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'power_module', 'Current & Voltage Sensor Module')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.05, 0.018, 0.04]} />
          <meshStandardMaterial {...getMaterialProps('power_module', 'Current & Voltage Sensor Module', '#334155', 0.8, 0.2)} />
        </mesh>
      </group>

      {/* Dual DC-DC / BEC Regulators */}
      <group 
        ref={becRef}
        name="BEC"
        position={[-0.08, 0.20, 0.15]}
        onPointerOver={(e) => handlePointerOver(e, 'bec', 'Dual DC-DC / BEC Regulators')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'bec', 'Dual DC-DC / BEC Regulators')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.03, 0.018, 0.06]} />
          <meshStandardMaterial {...getMaterialProps('bec', 'Dual DC-DC / BEC Regulators', '#0284c7', 0.7, 0.3)} />
        </mesh>
      </group>

      {/* Digital Atmospheric Barometer */}
      <group 
        ref={barometerRef}
        name="Barometer"
        position={[0.06, 0.21, 0.12]}
        onPointerOver={(e) => handlePointerOver(e, 'barometer', 'Digital Atmospheric Barometer')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'barometer', 'Digital Atmospheric Barometer')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.025, 0.012, 0.025]} />
          <meshStandardMaterial {...getMaterialProps('barometer', 'Digital Atmospheric Barometer', '#94a3b8', 0.9, 0.2)} />
        </mesh>
      </group>

      {/* Internal Silicone Wiring Loom */}
      <group 
        ref={wiringRef}
        name="WiringLoom"
        position={[0.35, 0.20, 0.05]}
        onPointerOver={(e) => handlePointerOver(e, 'wiring', 'Silicone Wiring Harness & Connectors')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'wiring', 'Silicone Wiring Harness & Connectors')}
      >
        <mesh>
          <cylinderGeometry args={[0.005, 0.005, 0.45, 8]} />
          <meshStandardMaterial {...getMaterialProps('wiring', 'Silicone Wiring Harness & Connectors', '#0f172a', 0.4, 0.5)} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 3. FIXED-WINGS, COMPOSITE BOOMS, AND AILERONS                            */}
      {/* ========================================================================= */}
      {/* Starboard Wing Group (Moves along +X when exploded) */}
      <group ref={rightWingGroupRef} position={[1.15, 0.20, 0.05]}>
        {/* Starboard Fixed Wing Structure (Main wing box terminates at Z=-0.12) */}
        <mesh 
          name="RightWing"
          position={[0, 0, 0.04]}
          castShadow 
          receiveShadow
          onPointerEnter={(e) => handlePointerEnter(e, 'right_wing', 'Starboard Fixed Wing (Right)')}
          onPointerLeave={handlePointerLeave}
          onClick={(e) => handleClick(e, 'right_wing', 'Starboard Fixed Wing (Right)')}
        >
          <boxGeometry args={[1.95, 0.038, 0.32]} />
          <meshStandardMaterial 
            {...getMaterialProps('right_wing', 'Starboard Fixed Wing (Right)', '#ffffff', 0.15, 0.35)} 
          />
        </mesh>

        {/* Starboard Orange Wingtip */}
        <mesh 
          name="RightWingTip"
          position={[0.95, 0.002, 0.04]} 
          castShadow
          onPointerEnter={(e) => handlePointerEnter(e, 'right_wing', 'Starboard Fixed Wing (Right)')}
          onPointerLeave={handlePointerLeave}
          onClick={(e) => handleClick(e, 'right_wing', 'Starboard Fixed Wing (Right)')}
        >
          <boxGeometry args={[0.28, 0.04, 0.30]} />
          <meshStandardMaterial 
            {...getMaterialProps('right_wing', 'Starboard Fixed Wing (Right)', '#ff6200', 0.3, 0.35)} 
          />
        </mesh>

        {/* Starboard High-Vis Striping */}
        <mesh position={[0.25, 0.021, 0.04]}>
          <boxGeometry args={[0.16, 0.002, 0.30]} />
          <meshStandardMaterial color="#ff6200" roughness={0.3} />
        </mesh>
        <mesh position={[0.55, 0.021, 0.04]}>
          <boxGeometry args={[0.08, 0.002, 0.30]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Starboard Aileron Surface & Actuator Servo (Trailing edge Z=-0.16) */}
        <group 
          ref={rightAileronRef} 
          position={[0.55, -0.005, -0.16]}
          onPointerEnter={(e) => handlePointerEnter(e, 'servo', 'Starboard Aileron Servo & Surface')}
          onPointerLeave={handlePointerLeave}
          onClick={(e) => handleClick(e, 'servo', 'Starboard Aileron Servo & Surface')}
        >
          <mesh 
            name="RightAileronServo"
            castShadow
          >
            <boxGeometry args={[0.85, 0.022, 0.07]} />
            <meshStandardMaterial 
              {...getMaterialProps('servo', 'Starboard Aileron Servo & Surface', '#334155', 0.5, 0.4)} 
            />
          </mesh>
        </group>
      </group>

      {/* Port Wing Group (Moves along -X when exploded) */}
      <group ref={leftWingGroupRef} position={[-1.15, 0.20, 0.05]}>
        {/* Port Fixed Wing Structure (Main wing box terminates at Z=-0.12) */}
        <mesh 
          name="LeftWing"
          position={[0, 0, 0.04]}
          castShadow 
          receiveShadow
          onPointerEnter={(e) => handlePointerEnter(e, 'left_wing', 'Port Fixed Wing (Left)')}
          onPointerLeave={handlePointerLeave}
          onClick={(e) => handleClick(e, 'left_wing', 'Port Fixed Wing (Left)')}
        >
          <boxGeometry args={[1.95, 0.038, 0.32]} />
          <meshStandardMaterial 
            {...getMaterialProps('left_wing', 'Port Fixed Wing (Left)', '#ffffff', 0.15, 0.35)} 
          />
        </mesh>

        {/* Port Orange Wingtip */}
        <mesh 
          name="LeftWingTip"
          position={[-0.95, 0.002, 0.04]} 
          castShadow
          onPointerEnter={(e) => handlePointerEnter(e, 'left_wing', 'Port Fixed Wing (Left)')}
          onPointerLeave={handlePointerLeave}
          onClick={(e) => handleClick(e, 'left_wing', 'Port Fixed Wing (Left)')}
        >
          <boxGeometry args={[0.28, 0.04, 0.30]} />
          <meshStandardMaterial 
            {...getMaterialProps('left_wing', 'Port Fixed Wing (Left)', '#ff6200', 0.3, 0.35)} 
          />
        </mesh>

        {/* Port High-Vis Striping */}
        <mesh position={[-0.25, 0.021, 0.04]}>
          <boxGeometry args={[0.16, 0.002, 0.30]} />
          <meshStandardMaterial color="#ff6200" roughness={0.3} />
        </mesh>
        <mesh position={[-0.55, 0.021, 0.04]}>
          <boxGeometry args={[0.08, 0.002, 0.30]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} />
        </mesh>

        {/* Port Aileron Surface & Actuator Servo (Trailing edge Z=-0.16) */}
        <group 
          ref={leftAileronRef} 
          position={[-0.55, -0.005, -0.16]}
          onPointerEnter={(e) => handlePointerEnter(e, 'servo', 'Port Aileron Servo & Surface')}
          onPointerLeave={handlePointerLeave}
          onClick={(e) => handleClick(e, 'servo', 'Port Aileron Servo & Surface')}
        >
          <mesh 
            name="LeftAileronServo"
            castShadow
          >
            <boxGeometry args={[0.85, 0.022, 0.07]} />
            <meshStandardMaterial 
              {...getMaterialProps('servo', 'Port Aileron Servo & Surface', '#334155', 0.5, 0.4)} 
            />
          </mesh>
        </group>
      </group>

      {/* Twin Carbon Fiber VTOL Booms (Length 1.60 spanning -0.80 to +0.80, terminating before motors) */}
      {/* Starboard Boom */}
      <group 
        position={[0.82, 0.20, 0]}
        onPointerEnter={(e) => handlePointerEnter(e, 'airframe', 'Starboard Carbon Fiber VTOL Boom')}
        onPointerLeave={handlePointerLeave}
        onClick={(e) => handleClick(e, 'airframe', 'Starboard Carbon Fiber VTOL Boom')}
      >
        <mesh 
          rotation={[Math.PI / 2, 0, 0]} 
          castShadow
        >
          <cylinderGeometry args={[0.028, 0.028, 1.60, 20]} />
          <meshStandardMaterial 
            {...getMaterialProps('airframe', 'Starboard Carbon Fiber VTOL Boom', '#0f172a', 0.85, 0.25)} 
          />
        </mesh>
        {/* Forward & Aft Carbon Tube Clamps */}
        <mesh position={[0, 0, 0.25]}>
          <boxGeometry args={[0.075, 0.065, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.25]}>
          <boxGeometry args={[0.075, 0.065, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Port Boom */}
      <group 
        position={[-0.82, 0.20, 0]}
        onPointerEnter={(e) => handlePointerEnter(e, 'airframe', 'Port Carbon Fiber VTOL Boom')}
        onPointerLeave={handlePointerLeave}
        onClick={(e) => handleClick(e, 'airframe', 'Port Carbon Fiber VTOL Boom')}
      >
        <mesh 
          rotation={[Math.PI / 2, 0, 0]} 
          castShadow
        >
          <cylinderGeometry args={[0.028, 0.028, 1.60, 20]} />
          <meshStandardMaterial 
            {...getMaterialProps('airframe', 'Port Carbon Fiber VTOL Boom', '#0f172a', 0.85, 0.25)} 
          />
        </mesh>
        {/* Forward & Aft Carbon Tube Clamps */}
        <mesh position={[0, 0, 0.25]}>
          <boxGeometry args={[0.075, 0.065, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.25]}>
          <boxGeometry args={[0.075, 0.065, 0.12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 4. FOUR VTOL LIFT MOTORS                                                 */}
      {/* ========================================================================= */}
      {/* Front-Left Motor */}
      <group 
        ref={vtolMotorFLRef} 
        position={[-0.82, 0.20, 0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_motor', 'VTOL Lift Motor (Front-Left)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_motor', 'VTOL Lift Motor (Front-Left)')}
      >
        <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.034, 0.028, 0.10, 18]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Front-Left)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh 
          position={[0, 0.035, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.045, 0.045, 0.032, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Front-Left)', '#334155', 0.8, 0.25)} />
        </mesh>
        <mesh 
          position={[0, 0.060, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.043, 0.043, 0.028, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Front-Left)', '#0f172a', 0.85, 0.2)} />
        </mesh>
      </group>

      {/* Front-Right Motor */}
      <group 
        ref={vtolMotorFRRef} 
        position={[0.82, 0.20, 0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_motor', 'VTOL Lift Motor (Front-Right)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_motor', 'VTOL Lift Motor (Front-Right)')}
      >
        <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.034, 0.028, 0.10, 18]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Front-Right)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh 
          position={[0, 0.035, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.045, 0.045, 0.032, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Front-Right)', '#334155', 0.8, 0.25)} />
        </mesh>
        <mesh 
          position={[0, 0.060, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.043, 0.043, 0.028, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Front-Right)', '#0f172a', 0.85, 0.2)} />
        </mesh>
      </group>

      {/* Rear-Left Motor */}
      <group 
        ref={vtolMotorRLRef} 
        position={[-0.82, 0.20, -0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_motor', 'VTOL Lift Motor (Rear-Left)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_motor', 'VTOL Lift Motor (Rear-Left)')}
      >
        <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.034, 0.028, 0.10, 18]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Rear-Left)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh 
          position={[0, 0.035, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.045, 0.045, 0.032, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Rear-Left)', '#334155', 0.8, 0.25)} />
        </mesh>
        <mesh 
          position={[0, 0.060, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.043, 0.043, 0.028, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Rear-Left)', '#0f172a', 0.85, 0.2)} />
        </mesh>
      </group>

      {/* Rear-Right Motor */}
      <group 
        ref={vtolMotorRRRef} 
        position={[0.82, 0.20, -0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_motor', 'VTOL Lift Motor (Rear-Right)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_motor', 'VTOL Lift Motor (Rear-Right)')}
      >
        <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.034, 0.028, 0.10, 18]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Rear-Right)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh 
          position={[0, 0.035, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.045, 0.045, 0.032, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Rear-Right)', '#334155', 0.8, 0.25)} />
        </mesh>
        <mesh 
          position={[0, 0.060, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.043, 0.043, 0.028, 24]} />
          <meshStandardMaterial {...getMaterialProps('vtol_motor', 'VTOL Lift Motor (Rear-Right)', '#0f172a', 0.85, 0.2)} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 5. FOUR VTOL 60A SPEED CONTROLLERS (ESCS)                                */}
      {/* ========================================================================= */}
      {/* Front-Left ESC */}
      <group 
        ref={vtolEscFLRef}
        position={[-0.82, 0.16, 0.85]} 
        onPointerOver={(e) => handlePointerOver(e, 'vtol_esc', 'VTOL 60A ESC (Front-Left)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_esc', 'VTOL 60A ESC (Front-Left)')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.040, 0.024, 0.11]} />
          <meshStandardMaterial {...getMaterialProps('vtol_esc', 'VTOL 60A ESC (Front-Left)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[0.034, 0.008, 0.08]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Front-Right ESC */}
      <group 
        ref={vtolEscFRRef}
        position={[0.82, 0.16, 0.85]} 
        onPointerOver={(e) => handlePointerOver(e, 'vtol_esc', 'VTOL 60A ESC (Front-Right)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_esc', 'VTOL 60A ESC (Front-Right)')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.040, 0.024, 0.11]} />
          <meshStandardMaterial {...getMaterialProps('vtol_esc', 'VTOL 60A ESC (Front-Right)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[0.034, 0.008, 0.08]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Rear-Left ESC */}
      <group 
        ref={vtolEscRLRef}
        position={[-0.82, 0.16, -0.85]} 
        onPointerOver={(e) => handlePointerOver(e, 'vtol_esc', 'VTOL 60A ESC (Rear-Left)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_esc', 'VTOL 60A ESC (Rear-Left)')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.040, 0.024, 0.11]} />
          <meshStandardMaterial {...getMaterialProps('vtol_esc', 'VTOL 60A ESC (Rear-Left)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[0.034, 0.008, 0.08]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Rear-Right ESC */}
      <group 
        ref={vtolEscRRRef}
        position={[0.82, 0.16, -0.85]} 
        onPointerOver={(e) => handlePointerOver(e, 'vtol_esc', 'VTOL 60A ESC (Rear-Right)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_esc', 'VTOL 60A ESC (Rear-Right)')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.040, 0.024, 0.11]} />
          <meshStandardMaterial {...getMaterialProps('vtol_esc', 'VTOL 60A ESC (Rear-Right)', '#1e293b', 0.7, 0.3)} />
        </mesh>
        <mesh position={[0, 0.005, 0]}>
          <boxGeometry args={[0.034, 0.008, 0.08]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 6. FOUR 16-INCH VTOL CARBON FIBER PROPELLERS                             */}
      {/* ========================================================================= */}
      {/* Front-Left Propeller */}
      <group 
        ref={vtolPropFLRef} 
        position={[-0.82, 0.28, 0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_propeller', 'VTOL Carbon Propeller (Front-Left)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_propeller', 'VTOL Carbon Propeller (Front-Left)')}
      >
        <group ref={vtolPropSpinFLRef}>
          <mesh castShadow>
            <boxGeometry args={[0.026, 0.008, 0.58]} />
            <meshStandardMaterial {...getMaterialProps('vtol_propeller', 'VTOL Carbon Propeller (Front-Left)', '#0f172a', 0.85, 0.2)} />
          </mesh>
          <mesh position={[0, 0.008, 0]} castShadow>
            <cylinderGeometry args={[0.016, 0.020, 0.016, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* High-Vis Orange Tips */}
          <mesh position={[0, 0.002, 0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.002, -0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Front-Right Propeller */}
      <group 
        ref={vtolPropFRRef} 
        position={[0.82, 0.28, 0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_propeller', 'VTOL Carbon Propeller (Front-Right)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_propeller', 'VTOL Carbon Propeller (Front-Right)')}
      >
        <group ref={vtolPropSpinFRRef}>
          <mesh castShadow>
            <boxGeometry args={[0.026, 0.008, 0.58]} />
            <meshStandardMaterial {...getMaterialProps('vtol_propeller', 'VTOL Carbon Propeller (Front-Right)', '#0f172a', 0.85, 0.2)} />
          </mesh>
          <mesh position={[0, 0.008, 0]} castShadow>
            <cylinderGeometry args={[0.016, 0.020, 0.016, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* High-Vis Orange Tips */}
          <mesh position={[0, 0.002, 0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.002, -0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Rear-Left Propeller */}
      <group 
        ref={vtolPropRLRef} 
        position={[-0.82, 0.28, -0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_propeller', 'VTOL Carbon Propeller (Rear-Left)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_propeller', 'VTOL Carbon Propeller (Rear-Left)')}
      >
        <group ref={vtolPropSpinRLRef}>
          <mesh castShadow>
            <boxGeometry args={[0.026, 0.008, 0.58]} />
            <meshStandardMaterial {...getMaterialProps('vtol_propeller', 'VTOL Carbon Propeller (Rear-Left)', '#0f172a', 0.85, 0.2)} />
          </mesh>
          <mesh position={[0, 0.008, 0]} castShadow>
            <cylinderGeometry args={[0.016, 0.020, 0.016, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* High-Vis Orange Tips */}
          <mesh position={[0, 0.002, 0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.002, -0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Rear-Right Propeller */}
      <group 
        ref={vtolPropRRRef} 
        position={[0.82, 0.28, -0.92]}
        onPointerOver={(e) => handlePointerOver(e, 'vtol_propeller', 'VTOL Carbon Propeller (Rear-Right)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'vtol_propeller', 'VTOL Carbon Propeller (Rear-Right)')}
      >
        <group ref={vtolPropSpinRRRef}>
          <mesh castShadow>
            <boxGeometry args={[0.026, 0.008, 0.58]} />
            <meshStandardMaterial {...getMaterialProps('vtol_propeller', 'VTOL Carbon Propeller (Rear-Right)', '#0f172a', 0.85, 0.2)} />
          </mesh>
          <mesh position={[0, 0.008, 0]} castShadow>
            <cylinderGeometry args={[0.016, 0.020, 0.016, 16]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* High-Vis Orange Tips */}
          <mesh position={[0, 0.002, 0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.002, -0.27]}>
            <boxGeometry args={[0.026, 0.009, 0.04]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 7. FORWARD CRUISE PROPULSION SYSTEM (AFT PUSHER MOTOR + PROP + ESC)      */}
      {/* ========================================================================= */}
      {/* Cruise Motor & Firewall Mount */}
      <group 
        ref={cruiseMotorGroupRef} 
        position={[0, 0.20, -1.08]}
        onPointerOver={(e) => handlePointerOver(e, 'cruise_motor', 'Forward Cruise Motor (Pusher)')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'cruise_motor', 'Forward Cruise Motor (Pusher)')}
      >
        <mesh 
          name="CruiseMotorMount"
          rotation={[Math.PI / 2, 0, 0]} 
          castShadow 
        >
          <cylinderGeometry args={[0.055, 0.065, 0.06, 24]} />
          <meshStandardMaterial {...getMaterialProps('cruise_motor', 'Forward Cruise Motor (Pusher)', '#0f172a', 0.85, 0.2)} />
        </mesh>
        <mesh 
          name="CruiseMotorBell"
          position={[0, 0, -0.045]} 
          rotation={[Math.PI / 2, 0, 0]} 
          castShadow
        >
          <cylinderGeometry args={[0.042, 0.042, 0.06, 24]} />
          <meshStandardMaterial {...getMaterialProps('cruise_motor', 'Forward Cruise Motor (Pusher)', '#334155', 0.9, 0.25)} />
        </mesh>
      </group>

      {/* Cruise 80A ESC */}
      <group 
        ref={cruiseEscGroupRef}
        position={[0, 0.18, -0.75]}
        onPointerOver={(e) => handlePointerOver(e, 'cruise_esc', 'Cruise 80A ESC')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'cruise_esc', 'Cruise 80A ESC')}
      >
        <mesh castShadow>
          <boxGeometry args={[0.05, 0.022, 0.09]} />
          <meshStandardMaterial {...getMaterialProps('cruise_esc', 'Cruise 80A ESC', '#0284c7', 0.7, 0.3)} />
        </mesh>
      </group>

      {/* Cruise Pusher Propeller & Aerodynamic Spinner */}
      <group 
        ref={cruisePropGroupRef} 
        position={[0, 0.20, -1.20]}
        onPointerOver={(e) => handlePointerOver(e, 'cruise_propeller', 'Cruise Pusher Propeller')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'cruise_propeller', 'Cruise Pusher Propeller')}
      >
        <group ref={cruisePropSpinRef}>
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.024, 0.008]} />
            <meshStandardMaterial {...getMaterialProps('cruise_propeller', 'Cruise Pusher Propeller', '#0f172a', 0.8, 0.25)} />
          </mesh>
          <mesh position={[0, 0, -0.025]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.002, 0.040, 0.065, 24]} />
            <meshStandardMaterial {...getMaterialProps('cruise_propeller', 'Cruise Pusher Propeller', '#0f172a', 0.9, 0.2)} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 8. INVERTED V-TAIL FINS & DUAL RUDDERVATOR CONTROL SURFACES               */}
      {/* ========================================================================= */}
      {/* Starboard Inverted V-Fin */}
      <group ref={rightVFinGroupRef} position={[0.18, 0.20, -0.85]} rotation={[0, 0, 0.55]}>
        <mesh 
          name="RightVFin"
          castShadow 
          receiveShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.026, 0.50, 0.18]} />
          <meshStandardMaterial {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f8fafc', 0.2, 0.35)} />
        </mesh>
        <mesh position={[0, 0.20, 0]}>
          <boxGeometry args={[0.028, 0.10, 0.16]} />
          <meshStandardMaterial color="#ff6200" roughness={0.3} />
        </mesh>

        {/* Starboard Ruddervator */}
        <group 
          ref={rightRuddervatorRef} 
          position={[0, 0, -0.10]}
          onPointerOver={(e) => handlePointerOver(e, 'servo', 'Starboard Ruddervator Servo & Surface')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'servo', 'Starboard Ruddervator Servo & Surface')}
        >
          <mesh 
            name="RightRuddervator"
            castShadow
          >
            <boxGeometry args={[0.020, 0.46, 0.05]} />
            <meshStandardMaterial {...getMaterialProps('servo', 'Starboard Ruddervator Servo & Surface', '#334155', 0.5, 0.4)} />
          </mesh>
        </group>
      </group>

      {/* Port Inverted V-Fin */}
      <group ref={leftVFinGroupRef} position={[-0.18, 0.20, -0.85]} rotation={[0, 0, -0.55]}>
        <mesh 
          name="LeftVFin"
          castShadow 
          receiveShadow
          onPointerOver={(e) => handlePointerOver(e, 'fuselage', 'Main Aircraft Fuselage')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'fuselage', 'Main Aircraft Fuselage')}
        >
          <boxGeometry args={[0.026, 0.50, 0.18]} />
          <meshStandardMaterial {...getMaterialProps('fuselage', 'Main Aircraft Fuselage', '#f8fafc', 0.2, 0.35)} />
        </mesh>
        <mesh position={[0, 0.20, 0]}>
          <boxGeometry args={[0.028, 0.10, 0.16]} />
          <meshStandardMaterial color="#ff6200" roughness={0.3} />
        </mesh>

        {/* Port Ruddervator */}
        <group 
          ref={leftRuddervatorRef} 
          position={[0, 0, -0.10]}
          onPointerOver={(e) => handlePointerOver(e, 'servo', 'Port Ruddervator Servo & Surface')}
          onPointerOut={handlePointerOut}
          onClick={(e) => handleClick(e, 'servo', 'Port Ruddervator Servo & Surface')}
        >
          <mesh 
            name="LeftRuddervator"
            castShadow
          >
            <boxGeometry args={[0.020, 0.46, 0.05]} />
            <meshStandardMaterial {...getMaterialProps('servo', 'Port Ruddervator Servo & Surface', '#334155', 0.5, 0.4)} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 9. RESCUE PAYLOAD GIMBAL, SENSORS, AND COMM ANTENNAS                      */}
      {/* ========================================================================= */}
      {/* EO/IR 3-Axis Stabilized Thermal Search & Rescue Gimbal */}
      <group 
        ref={gimbalGroupRef}
        position={[0, 0.10, 0.85]}
        onPointerOver={(e) => handlePointerOver(e, 'camera_gimbal', 'EO/IR 3-Axis Thermal Rescue Gimbal')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'camera_gimbal', 'EO/IR 3-Axis Thermal Rescue Gimbal')}
      >
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.075, 0.02, 24]} />
          <meshStandardMaterial {...getMaterialProps('camera_gimbal', 'EO/IR 3-Axis Thermal Rescue Gimbal', '#0f172a', 0.7, 0.3)} />
        </mesh>
        <group ref={gimbalYawRef}>
          <mesh position={[0, -0.015, 0]} castShadow>
            <cylinderGeometry args={[0.050, 0.050, 0.04, 20]} />
            <meshStandardMaterial {...getMaterialProps('camera_gimbal', 'EO/IR 3-Axis Thermal Rescue Gimbal', '#1e293b', 0.8, 0.25)} />
          </mesh>
          <group ref={gimbalPitchRef} position={[0, -0.045, 0.02]}>
            <mesh castShadow>
              <sphereGeometry args={[0.062, 24, 24]} />
              <meshStandardMaterial {...getMaterialProps('camera_gimbal', 'EO/IR 3-Axis Thermal Rescue Gimbal', '#0f172a', 0.8, 0.2)} />
            </mesh>
            {/* Primary Optical Daylight Zoom Camera Lens */}
            <mesh position={[0.018, 0.005, 0.052]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.020, 0.020, 0.012, 16]} />
              <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* FLIR Radiometric Thermal Sensor Window */}
            <mesh position={[-0.018, -0.010, 0.052]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.014, 0.014, 0.010, 16]} />
              <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* 1500-Lumen High-Intensity LED Searchlight */}
            <mesh position={[0, -0.035, 0.042]}>
              <boxGeometry args={[0.045, 0.015, 0.012]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3.0} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Digital Airspeed Sensor & Heated Pitot-Static Tube */}
      <group 
        ref={pitotRef} 
        position={[0, 0.20, 1.20]} 
        onPointerEnter={(e) => handlePointerEnter(e, 'pitot_airspeed', 'Digital Airspeed Sensor & Heated Pitot Tube')}
        onPointerLeave={handlePointerLeave}
        onClick={(e) => handleClick(e, 'pitot_airspeed', 'Digital Airspeed Sensor & Heated Pitot Tube')}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.18, 12]} />
          <meshStandardMaterial {...getMaterialProps('pitot_airspeed', 'Digital Airspeed Sensor & Heated Pitot Tube', '#94a3b8', 0.95, 0.1)} />
        </mesh>
        <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.002, 0.005, 0.04, 12]} />
          <meshStandardMaterial {...getMaterialProps('pitot_airspeed', 'Digital Airspeed Sensor & Heated Pitot Tube', '#cbd5e1', 0.9, 0.1)} />
        </mesh>
      </group>

      {/* High-Precision Multi-Band GNSS / GPS + Compass Puck */}
      <group 
        ref={gpsRef} 
        position={[0, 0.28, -0.15]} 
        onPointerOver={(e) => handlePointerOver(e, 'gps_compass', 'High-Precision GNSS / GPS + Compass Puck')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'gps_compass', 'High-Precision GNSS / GPS + Compass Puck')}
      >
        <mesh position={[0, 0.010, 0]} castShadow>
          <cylinderGeometry args={[0.038, 0.042, 0.016, 24]} />
          <meshStandardMaterial {...getMaterialProps('gps_compass', 'High-Precision GNSS / GPS + Compass Puck', '#0f172a', 0.4, 0.3)} />
        </mesh>
        <mesh position={[0, 0.018, 0]}>
          <cylinderGeometry args={[0.034, 0.036, 0.004, 24]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Mast mount */}
        <mesh position={[0, -0.015, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.035, 12]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Long-Range GCS Telemetry Antenna */}
      <group 
        ref={telemetryRef} 
        position={[-0.07, 0.11, -0.32]} 
        onPointerOver={(e) => handlePointerOver(e, 'telemetry', 'Long-Range GCS Telemetry Antenna')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'telemetry', 'Long-Range GCS Telemetry Antenna')}
      >
        <mesh rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.002, 0.10, 8]} />
          <meshStandardMaterial {...getMaterialProps('telemetry', 'Long-Range GCS Telemetry Antenna', '#0f172a', 0.8, 0.2)} />
        </mesh>
      </group>

      {/* RC Emergency Override Receiver & Antenna */}
      <group 
        ref={rcReceiverRef} 
        position={[0.14, 0.23, 0.15]} 
        onPointerOver={(e) => handlePointerOver(e, 'rc_receiver', 'RC Emergency Override Receiver')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'rc_receiver', 'RC Emergency Override Receiver')}
      >
        <mesh rotation={[0, 0, 0.35]}>
          <cylinderGeometry args={[0.0025, 0.002, 0.12, 8]} />
          <meshStandardMaterial {...getMaterialProps('rc_receiver', 'RC Emergency Override Receiver', '#475569', 0.7, 0.3)} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 10. COMPOSITE REINFORCED LANDING SKIDS                                   */}
      {/* ========================================================================= */}
      {/* Starboard Skid */}
      <group 
        ref={rightSkidRef} 
        position={[0.14, 0.07, 0]}
        onPointerOver={(e) => handlePointerOver(e, 'landing_gear', 'Starboard Landing Skid')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'landing_gear', 'Starboard Landing Skid')}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.010, 0.010, 0.68, 12]} />
          <meshStandardMaterial {...getMaterialProps('landing_gear', 'Starboard Landing Skid', '#0f172a', 0.7, 0.4)} />
        </mesh>
        {/* Support Struts */}
        <mesh position={[0, 0.038, 0.18]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.007, 0.007, 0.085, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.038, -0.18]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.007, 0.007, 0.085, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Port Skid */}
      <group 
        ref={leftSkidRef} 
        position={[-0.14, 0.07, 0]}
        onPointerOver={(e) => handlePointerOver(e, 'landing_gear', 'Port Landing Skid')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'landing_gear', 'Port Landing Skid')}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.010, 0.010, 0.68, 12]} />
          <meshStandardMaterial {...getMaterialProps('landing_gear', 'Port Landing Skid', '#0f172a', 0.7, 0.4)} />
        </mesh>
        {/* Support Struts */}
        <mesh position={[0, 0.038, 0.18]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.007, 0.007, 0.085, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.038, -0.18]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.007, 0.007, 0.085, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};
