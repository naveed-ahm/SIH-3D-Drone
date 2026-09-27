import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { DroneComponent } from '../../types/drone';

interface Component3DViewerProps {
  component: DroneComponent;
  viewAngle: 'iso' | 'front' | 'side' | 'top';
  autoRotate: boolean;
}

const ProceduralComponentMesh: React.FC<{ modelType: string }> = ({ modelType }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Subtle float / rotation
    if (meshRef.current && (modelType === 'vtol_propeller' || modelType === 'cruise_propeller')) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  switch (modelType) {
    case 'vtol_motor':
    case 'cruise_motor':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Stator Base */}
          <mesh position={[0, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.55, 0.6, 0.15, 32]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Mounting cross lugs */}
          <mesh position={[0, -0.25, 0]}>
            <boxGeometry args={[1.4, 0.05, 0.25]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.25, 0]}>
            <boxGeometry args={[0.25, 0.05, 1.4]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Copper Stator Windings */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.48, 0.48, 0.28, 24]} />
            <meshStandardMaterial color="#b45309" metalness={0.7} roughness={0.35} />
          </mesh>
          {/* Rotor Bell Housing */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.58, 0.58, 0.35, 32]} />
            <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Bell Top Cap with Cooling Vents */}
          <mesh position={[0, 0.32, 0]} castShadow>
            <cylinderGeometry args={[0.52, 0.58, 0.08, 32]} />
            <meshStandardMaterial color="#0284c7" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Hardened Steel Motor Shaft */}
          <mesh position={[0, 0.48, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.4, 20]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Prop Adapter Nut */}
          <mesh position={[0, 0.62, 0]}>
            <coneGeometry args={[0.16, 0.25, 20]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Silicone Lead Wires */}
          <mesh position={[-0.35, -0.22, 0.2]} rotation={[0.4, 0, 0.5]}>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
            <meshStandardMaterial color="#ef4444" roughness={0.6} />
          </mesh>
          <mesh position={[-0.35, -0.22, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
            <meshStandardMaterial color="#0284c7" roughness={0.6} />
          </mesh>
          <mesh position={[-0.35, -0.22, -0.2]} rotation={[-0.4, 0, 0.5]}>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
        </group>
      );

    case 'vtol_esc':
    case 'cruise_esc':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Main PCB body */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.6, 0.16, 0.75]} />
            <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Anodized Blue Aluminum Heat Sink */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <boxGeometry args={[1.3, 0.1, 0.65]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Heatsink Fin Ridges */}
          {[-0.45, -0.15, 0.15, 0.45].map((x) => (
            <mesh key={x} position={[x, 0.2, 0]}>
              <boxGeometry args={[0.04, 0.08, 0.62]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.85} roughness={0.2} />
            </mesh>
          ))}
          {/* Filter Capacitors */}
          <mesh position={[0.7, 0.08, 0.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.35, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.7, 0.08, -0.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.35, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Heavy Silicone Leads */}
          <mesh position={[-0.9, 0, 0.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 12]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
          <mesh position={[-0.9, 0, -0.18]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} />
          </mesh>
        </group>
      );

    case 'vtol_propeller':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Center CNC Hub */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 24]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Center Mount Hole */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.08, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Blade 1 (Carbon Fiber Folding) */}
          <group position={[0.8, 0, 0]} rotation={[0, 0, 0.05]}>
            <mesh castShadow>
              <boxGeometry args={[1.4, 0.04, 0.22]} />
              <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.35} />
            </mesh>
            {/* Orange High-Vis Tip */}
            <mesh position={[0.65, 0, 0]}>
              <boxGeometry args={[0.2, 0.042, 0.22]} />
              <meshStandardMaterial color="#ff6200" roughness={0.3} />
            </mesh>
          </group>
          {/* Blade 2 */}
          <group position={[-0.8, 0, 0]} rotation={[0, 0, -0.05]}>
            <mesh castShadow>
              <boxGeometry args={[1.4, 0.04, 0.22]} />
              <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.35} />
            </mesh>
            {/* Orange High-Vis Tip */}
            <mesh position={[-0.65, 0, 0]}>
              <boxGeometry args={[0.2, 0.042, 0.22]} />
              <meshStandardMaterial color="#ff6200" roughness={0.3} />
            </mesh>
          </group>
          {/* Pivot Bolts */}
          <mesh position={[0.2, 0.08, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.2, 0.08, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      );

    case 'cruise_propeller':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Streamlined Pusher Spinner */}
          <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <coneGeometry args={[0.3, 0.65, 32]} />
            <meshStandardMaterial color="#ff6200" metalness={0.3} roughness={0.25} />
          </mesh>
          {/* Pusher Propeller Blades */}
          <mesh castShadow>
            <boxGeometry args={[2.2, 0.16, 0.04]} />
            <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Hub Collar */}
          <mesh position={[0, 0, -0.05]}>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 24]} />
            <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      );

    case 'flight_controller':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Damped Base Plate */}
          <mesh position={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[1.5, 0.1, 1.2]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Autopilot Main Cube Housing (Orange / Black) */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <boxGeometry args={[1.1, 0.45, 1.0]} />
            <meshStandardMaterial color="#ff6200" metalness={0.2} roughness={0.3} />
          </mesh>
          {/* Top Label & Logo Window */}
          <mesh position={[0, 0.33, 0]}>
            <boxGeometry args={[0.9, 0.02, 0.8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* RGB Status LED */}
          <mesh position={[0, 0.345, 0.25]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2.5} />
          </mesh>
          {/* Gold Pin Headers */}
          {[-0.4, -0.2, 0, 0.2, 0.4].map((x) => (
            <mesh key={x} position={[x, -0.08, 0.55]}>
              <boxGeometry args={[0.06, 0.08, 0.1]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
          {/* USB-C Port */}
          <mesh position={[0.56, -0.05, 0]}>
            <boxGeometry args={[0.04, 0.06, 0.18]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      );

    case 'gps':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Carbon Mast Tube */}
          <mesh position={[0, -0.5, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1.0, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Mast Mount Base */}
          <mesh position={[0, -1.0, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 0.12, 20]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* GPS Dome Puck Antenna Housing */}
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.65, 0.65, 0.16, 32]} />
            <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.4} />
          </mesh>
          {/* Rounded Top Dome */}
          <mesh position={[0, 0.16, 0]} castShadow>
            <sphereGeometry args={[0.62, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3]} />
            <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.35} />
          </mesh>
          {/* Heading Alignment Arrow */}
          <mesh position={[0, 0.28, 0.25]} rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.08, 0.2, 16]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
          {/* Dual Status Indicator LEDs */}
          <mesh position={[0.2, 0.2, -0.2]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[-0.2, 0.2, -0.2]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} />
          </mesh>
        </group>
      );

    case 'pitot':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Differential Pressure Sensor Board */}
          <mesh position={[-0.5, 0, 0]} castShadow>
            <boxGeometry args={[0.6, 0.1, 0.5]} />
            <meshStandardMaterial color="#0284c7" metalness={0.4} roughness={0.5} />
          </mesh>
          {/* Pitot Tube Shaft (Prandtl Stainless Steel) */}
          <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.4, 20]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Pitot Dynamic Orifice Tip */}
          <mesh position={[1.1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.04, 0.15, 20]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Static Ring Holes */}
          <mesh position={[0.8, 0, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.05, 16]} />
            <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Silicone Air Pressure Tubes */}
          <mesh position={[-0.1, 0.08, 0.08]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.025, 0.025, 0.35, 12]} />
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.65} roughness={0.2} />
          </mesh>
          <mesh position={[-0.1, 0.08, -0.08]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.025, 0.025, 0.35, 12]} />
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.65} roughness={0.2} />
          </mesh>
        </group>
      );

    case 'battery':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* 6S 16,000mAh Battery Pack Body */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.8, 0.7, 0.9]} />
            <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.5} />
          </mesh>
          {/* Carbon Fiber Protective Armor Wrap */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.82, 0.71, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* SilentResQ High-Voltage Label */}
          <mesh position={[0, 0.36, 0]}>
            <planeGeometry args={[1.2, 0.6]} />
            <meshStandardMaterial color="#ff6200" roughness={0.3} />
          </mesh>
          {/* Main 10AWG Silicone Power Cables */}
          <mesh position={[0.95, 0.15, 0.15]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.3, 12]} />
            <meshStandardMaterial color="#ef4444" roughness={0.6} />
          </mesh>
          <mesh position={[0.95, 0.15, -0.15]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.3, 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} />
          </mesh>
          {/* Amass XT90-S Anti-Spark Connector */}
          <mesh position={[1.15, 0.15, 0]} castShadow>
            <boxGeometry args={[0.2, 0.15, 0.35]} />
            <meshStandardMaterial color="#eab308" metalness={0.3} roughness={0.4} />
          </mesh>
          {/* JST-XH 6S Balance Lead */}
          <mesh position={[0.95, -0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.08, 0.25, 0.2]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.3} />
          </mesh>
        </group>
      );

    case 'servo':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Servo Main Case Body */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.7, 0.8, 0.4]} />
            <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.4} />
          </mesh>
          {/* CNC Aluminum Middle Heat Sink Band */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.72, 0.3, 0.42]} />
            <meshStandardMaterial color="#0284c7" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Mounting Flanges */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[1.1, 0.06, 0.4]} />
            <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Metal Output Spline Gear */}
          <mesh position={[0.18, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.1, 0.12, 20]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Servo Horn Arm */}
          <mesh position={[0.26, 0.52, 0]} castShadow>
            <boxGeometry args={[0.45, 0.04, 0.14]} />
            <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      );

    case 'gimbal_camera':
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          {/* Mounting Damper Plate with rubber balls */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.55, 0.6, 0.08, 24]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Yaw Arm */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.35, 20]} />
            <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Roll / Pitch Gimbal Ring */}
          <mesh position={[0, 0.05, 0]}>
            <torusGeometry args={[0.48, 0.06, 16, 32]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Spherical EO/IR Turret Pod */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <sphereGeometry args={[0.45, 32, 32]} />
            <meshStandardMaterial color="#090d16" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* 4K Daylight Optical Zoom Lens */}
          <mesh position={[0.14, 0.02, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.14, 0.14, 0.12, 24]} />
            <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.08} />
          </mesh>
          {/* Lens Glass Element */}
          <mesh position={[0.14, 0.02, 0.44]}>
            <circleGeometry args={[0.12, 24]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
          </mesh>
          {/* FLIR Thermal Sensor Germanium Lens Window */}
          <mesh position={[-0.16, 0.02, 0.38]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.1, 20]} />
            <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.1} emissive="#b45309" emissiveIntensity={0.4} />
          </mesh>
          {/* Focused 1,500 Lumen Searchlight Reflector */}
          <mesh position={[0, -0.2, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.08, 20]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
          </mesh>
        </group>
      );

    default:
      // Generic high-precision aerospace module
      return (
        <group ref={meshRef} position={[0, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.5, 0.8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <boxGeometry args={[0.9, 0.04, 0.6]} />
            <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      );
  }
};

export const Component3DViewer: React.FC<Component3DViewerProps> = ({
  component,
  viewAngle,
  autoRotate
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Position based on viewAngle
  const getCameraPosition = (): [number, number, number] => {
    switch (viewAngle) {
      case 'front':
        return [0, 0.2, 2.8];
      case 'side':
        return [2.8, 0.2, 0];
      case 'top':
        return [0, 3.0, 0.01];
      case 'iso':
      default:
        return [2.0, 1.4, 2.0];
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-lg overflow-hidden border border-slate-700/60 shadow-inner">
      <Canvas
        shadows
        camera={{ position: getCameraPosition(), fov: 45 }}
        className="w-full h-full"
      >
        <color attach="background" args={['#090d16']} />
        
        {/* Calibrated Studio Lighting for Individual Components */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 3]} intensity={1.5} color="#ffffff" castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.8} color="#38bdf8" />
        <directionalLight position={[0, -2, 2]} intensity={0.4} color="#f8fafc" />

        {/* Studio Floor & Reference Grid */}
        <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[8, 8]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        <gridHelper args={[6, 12, '#38bdf8', '#334155']} position={[0, -0.84, 0]} />

        {/* Procedural 3D Component */}
        <ProceduralComponentMesh modelType={component.modelType} />

        {/* Orbit Controls */}
        <DreiOrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          minDistance={0.6}
          maxDistance={5.0}
          autoRotate={autoRotate}
          autoRotateSpeed={2.5}
          makeDefault
        />
      </Canvas>
    </div>
  );
};
