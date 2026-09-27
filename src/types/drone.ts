export type FlightMode = 'VTOL' | 'TRANSITION' | 'CRUISE';

export type CameraViewPreset = 'iso' | 'front' | 'rear' | 'left' | 'right' | 'top' | 'bottom';

export type SystemCategory = 
  | 'All'
  | 'Propulsion' 
  | 'VTOL System' 
  | 'Cruise System' 
  | 'Flight Control' 
  | 'Navigation' 
  | 'Communication' 
  | 'Power' 
  | 'Rescue Payload' 
  | 'Airframe';

export interface DroneComponent {
  id: string;
  name: string;
  quantity: number;
  category: SystemCategory;
  role: string;
  purpose: string;
  description: string;
  integration: string;
  approxPrice: string;
  status: 'Integrated' | 'Calibrated' | 'Standby' | 'Active';
  installationArea: string;
  systemDependency: string;
  specs: Record<string, string>;
  image?: string;
  hotspotPosition?: [number, number, number];
  hotspotLabel?: string;
  modelType: 
    | 'airframe'
    | 'vtol_motor'
    | 'vtol_esc'
    | 'vtol_propeller'
    | 'cruise_motor'
    | 'cruise_esc'
    | 'cruise_propeller'
    | 'flight_controller'
    | 'gps'
    | 'pitot'
    | 'barometer'
    | 'servo'
    | 'rc_receiver'
    | 'telemetry'
    | 'power_module'
    | 'pdb'
    | 'battery'
    | 'bec'
    | 'wiring'
    | 'gimbal_camera'
    | 'searchlight';
}

export interface ViewerSettings {
  autoRotate: boolean;
  autoRotateSpeed: number;
  showGrid: boolean;
  showHotspots: boolean;
  showLabels: boolean;
  showThrustVectors: boolean;
  animatePropellers: boolean;
  lightingIntensity: number;
  ambientOcclusion: boolean;
  wireframeMode: boolean;
}
