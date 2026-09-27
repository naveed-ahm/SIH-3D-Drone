import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FlightMode } from '../../types/drone';

interface ThrustVectorsProps {
  flightMode: FlightMode;
  visible: boolean;
}

export const ThrustVectors: React.FC<ThrustVectorsProps> = ({ flightMode, visible }) => {
  if (!visible) return null;

  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ringRefs.current.forEach((ring, idx) => {
      if (ring) {
        const offset = (t * 2 + idx * 0.25) % 1;
        ring.position.y = -offset * 0.45;
        ring.scale.setScalar(1 + offset * 0.8);
        const mat = ring.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = Math.max(0, 0.6 * (1 - offset));
        }
      }
    });
  });

  const vtolMotorPositions: [number, number, number][] = [
    [-0.82, 0.20, 0.92],
    [0.82, 0.20, 0.92],
    [-0.82, 0.20, -0.92],
    [0.82, 0.20, -0.92],
  ];

  const showVtolThrust = flightMode === 'VTOL' || flightMode === 'TRANSITION';
  const showCruiseThrust = flightMode === 'CRUISE' || flightMode === 'TRANSITION';

  return (
    <group ref={groupRef}>
      {/* Downward Vertical Thrust Vectors for 4 VTOL Motors */}
      {showVtolThrust &&
        vtolMotorPositions.map((pos, motorIdx) => (
          <group key={motorIdx} position={pos}>
            {/* Soft Downward Gradient Thrust Cone */}
            <mesh position={[0, -0.22, 0]}>
              <coneGeometry args={[0.18, 0.44, 20, 1, true]} />
              <meshBasicMaterial
                color="#06b6d4"
                transparent
                opacity={0.22}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>

            {/* Inner High-Velocity Core Stream */}
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.02, 0.08, 0.3, 16, 1, true]} />
              <meshBasicMaterial
                color="#38bdf8"
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>

            {/* Pulsing Airflow Waves */}
            {[0, 1, 2].map((ringIdx) => {
              const arrayIdx = motorIdx * 3 + ringIdx;
              return (
                <mesh
                  key={ringIdx}
                  ref={(el) => { ringRefs.current[arrayIdx] = el; }}
                  rotation={[-Math.PI / 2, 0, 0]}
                  position={[0, 0, 0]}
                >
                  <ringGeometry args={[0.05, 0.08, 24]} />
                  <meshBasicMaterial
                    color="#38bdf8"
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                  />
                </mesh>
              );
            })}
          </group>
        ))}

      {/* Horizontal Forward Cruise Pusher Slipstream Vector */}
      {showCruiseThrust && (
        <group position={[0, 0.20, -1.25]}>
          {/* Rearward thrust cone */}
          <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.16, 0.6, 20, 1, true]} />
            <meshBasicMaterial
              color="#f97316"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.08, 0.4, 16, 1, true]} />
            <meshBasicMaterial
              color="#fb923c"
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};
