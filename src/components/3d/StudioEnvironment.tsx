import React from 'react';
import * as THREE from 'three';
import { ViewerSettings } from '../../types/drone';

interface StudioEnvironmentProps {
  settings: ViewerSettings;
}

export const StudioEnvironment: React.FC<StudioEnvironmentProps> = ({ settings }) => {
  const intensity = settings.lightingIntensity ?? 1.0;

  return (
    <group name="Studio_Lighting_And_Floor">
      {/* Three-Point Studio Lighting */}
      {/* 1. Key Directional Light (Warm tinted, front-right 45 deg, casts crisp soft shadow) */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4 * intensity}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={18}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
        shadow-bias={-0.0004}
      />

      {/* 2. Fill Light (Soft cool bluish ambient, front-left) */}
      <directionalLight
        position={[-5, 4, 3]}
        intensity={0.7 * intensity}
        color="#e0f2fe"
      />

      {/* 3. Rim Light (Back-top sharp highlight for aircraft silhouette separation) */}
      <directionalLight
        position={[0, 6, -6]}
        intensity={1.2 * intensity}
        color="#bae6fd"
      />

      {/* 4. Under-Aircraft Bounce Light (Light ground bounce so belly details remain clear) */}
      <directionalLight
        position={[0, -4, 0]}
        intensity={0.35 * intensity}
        color="#f1f5f9"
      />

      {/* Soft Hemispheric Ambient Light */}
      <hemisphereLight
        args={['#ffffff', '#cbd5e1', 0.85 * intensity]}
      />

      {/* Studio Floor Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.65, 0]}
        receiveShadow
      >
        <planeGeometry args={[24, 24]} />
        <shadowMaterial opacity={0.18} />
      </mesh>

      {/* Subtle Aerospace Studio Ground Disc */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.66, 0]}
      >
        <circleGeometry args={[4.5, 64]} />
        <meshBasicMaterial
          color="#e2e8f0"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Soft Contact Shadow Faux-Plate beneath drone center */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.648, 0]}
      >
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial
          color="#0f172a"
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Circular Reference Grid & Compass Markings */}
      {settings.showGrid && (
        <group position={[0, -0.645, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          {/* Concentric rings (1m, 2m, 3m, 4m) */}
          {[0.8, 1.6, 2.4, 3.2, 4.0].map((radius, idx) => (
            <mesh key={radius}>
              <ringGeometry args={[radius - 0.005, radius + 0.005, 72]} />
              <meshBasicMaterial
                color="#94a3b8"
                transparent
                opacity={idx === 2 ? 0.35 : 0.18}
                depthWrite={false}
              />
            </mesh>
          ))}

          {/* Radial Crosshairs (X and Z axis reference lines) */}
          <mesh>
            <planeGeometry args={[0.01, 8.0]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.2} depthWrite={false} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[0.01, 8.0]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.2} depthWrite={false} />
          </mesh>

          {/* 45-degree reference diagonals */}
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.006, 6.0]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <planeGeometry args={[0.006, 6.0]} />
            <meshBasicMaterial color="#94a3b8" transparent opacity={0.12} depthWrite={false} />
          </mesh>
        </group>
      )}
    </group>
  );
};
