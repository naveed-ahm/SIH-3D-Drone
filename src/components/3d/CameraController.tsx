import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { CameraViewPreset, DroneComponent } from '../../types/drone';
import { getComponentTargetPosition, getSubpartTargetPosition } from '../../utils/explodedOffsets';

interface CameraControllerProps {
  viewPreset: CameraViewPreset | null;
  selectedComponent: DroneComponent | null;
  selectedPartName?: string | null;
  isolatedComponent: DroneComponent | null;
  autoRotate: boolean;
  autoRotateSpeed: number;
  zoomTrigger: number;
  zoomDelta: number;
  isExploded?: boolean;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  viewPreset,
  selectedComponent,
  selectedPartName,
  isolatedComponent,
  autoRotate,
  autoRotateSpeed,
  zoomTrigger,
  zoomDelta,
  isExploded = false
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  // Target positions for smooth camera interpolation
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(2.8, 1.5, 2.5));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.20, 0));
  const isTransitioning = useRef<boolean>(true);

  // Update target when viewPreset changes
  useEffect(() => {
    if (!viewPreset) return;

    isTransitioning.current = true;
    const distScale = isExploded ? 1.3 : 1.0;

    switch (viewPreset) {
      case 'front':
        targetCamPos.current.set(0, 0.28, 3.4 * distScale);
        targetLookAt.current.set(0, 0.20, 0);
        break;
      case 'rear':
        targetCamPos.current.set(0, 0.32, -3.4 * distScale);
        targetLookAt.current.set(0, 0.20, 0);
        break;
      case 'left':
        targetCamPos.current.set(-3.6 * distScale, 0.28, 0);
        targetLookAt.current.set(0, 0.20, 0);
        break;
      case 'right':
        targetCamPos.current.set(3.6 * distScale, 0.28, 0);
        targetLookAt.current.set(0, 0.20, 0);
        break;
      case 'top':
        targetCamPos.current.set(0, 4.2 * distScale, 0.001);
        targetLookAt.current.set(0, 0.20, 0);
        break;
      case 'bottom':
        targetCamPos.current.set(0, -3.4 * distScale, 0.001);
        targetLookAt.current.set(0, 0.20, 0);
        break;
      case 'iso':
      default:
        targetCamPos.current.set(2.8 * distScale, 1.5 * distScale, 2.5 * distScale);
        targetLookAt.current.set(0, 0.20, 0);
        break;
    }
  }, [viewPreset, isExploded]);

  // Adjust camera framing when Exploded state toggles
  useEffect(() => {
    const activeTarget = isolatedComponent || selectedComponent;
    if (!activeTarget && !viewPreset) {
      isTransitioning.current = true;
      if (isExploded) {
        targetCamPos.current.set(3.5, 2.1, 3.5);
      } else {
        targetCamPos.current.set(2.8, 1.5, 2.5);
      }
      targetLookAt.current.set(0, 0.20, 0);
    }
  }, [isExploded, isolatedComponent, selectedComponent, viewPreset]);

  // Update target when a component is clicked/selected or isolated
  useEffect(() => {
    const activeTarget = isolatedComponent || selectedComponent;

    if (activeTarget && activeTarget.hotspotPosition) {
      isTransitioning.current = true;
      // Calculate true 3D coordinates based on whether drone is assembled or exploded,
      // pinpointing the exact clicked subpart if available (e.g. Front-Left motor, Port wing, etc.)
      const [hx, hy, hz] = getSubpartTargetPosition(
        selectedPartName,
        activeTarget.id,
        activeTarget.hotspotPosition,
        isExploded
      );

      targetLookAt.current.set(hx, hy, hz);

      // Distance based on component scale
      const isLargeComponent = activeTarget.id === 'airframe';
      const zoomDist = isLargeComponent ? (isExploded ? 2.8 : 2.4) : (isExploded ? 1.4 : 1.15);

      const offsetDir = new THREE.Vector3(
        hx === 0 ? 0.8 : Math.sign(hx) * 0.9,
        0.65,
        hz === 0 ? 1.0 : Math.sign(hz) * 0.8 + 0.3
      ).normalize();

      targetCamPos.current.set(
        hx + offsetDir.x * zoomDist,
        hy + offsetDir.y * zoomDist + 0.1,
        hz + offsetDir.z * zoomDist
      );
    } else if (!activeTarget && !viewPreset) {
      // Normal camera view restored when selection is cleared
      isTransitioning.current = true;
      if (isExploded) {
        targetCamPos.current.set(3.5, 2.1, 3.5);
      } else {
        targetCamPos.current.set(2.8, 1.5, 2.5);
      }
      targetLookAt.current.set(0, 0.20, 0);
    }
  }, [selectedComponent, selectedPartName, isolatedComponent, viewPreset, isExploded]);

  // Zoom buttons (+ / -) handler
  useEffect(() => {
    if (zoomTrigger === 0) return;
    if (controlsRef.current) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      camera.position.addScaledVector(dir, zoomDelta);
      controlsRef.current.update();
    }
  }, [zoomTrigger, zoomDelta, camera]);

  useFrame(() => {
    if (isTransitioning.current && controlsRef.current) {
      // Smooth lerp camera position
      camera.position.lerp(targetCamPos.current, 0.08);

      // Smooth lerp orbit control target
      controlsRef.current.target.lerp(targetLookAt.current, 0.08);
      controlsRef.current.update();

      // Check if camera has smoothly reached destination
      if (
        camera.position.distanceTo(targetCamPos.current) < 0.015 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.015
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={0.6}
      maxDistance={9.5}
      maxPolarAngle={Math.PI - 0.05}
      minPolarAngle={0.05}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
