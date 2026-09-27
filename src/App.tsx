import React, { useState, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  FlightMode, 
  CameraViewPreset, 
  SystemCategory, 
  DroneComponent, 
  ViewerSettings 
} from './types/drone';
import { DRONE_COMPONENTS, getComponentById } from './data/components';
import { DroneModel } from './components/3d/DroneModel';
import { ThrustVectors } from './components/3d/ThrustVectors';
import { StudioEnvironment } from './components/3d/StudioEnvironment';
import { CameraController } from './components/3d/CameraController';
import { Header } from './components/ui/Header';
import { Sidebar } from './components/ui/Sidebar';
import { ControlBar } from './components/ui/ControlBar';
import { ComponentInfoCard } from './components/ui/ComponentInfoCard';
import { ComponentExplorerModal } from './components/ui/ComponentExplorerModal';
import { ComponentDetailModal } from './components/ui/ComponentDetailModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { SpecificationsModal } from './components/ui/SpecificationsModal';

const DEFAULT_SETTINGS: ViewerSettings = {
  autoRotate: false,
  autoRotateSpeed: 1.5,
  showGrid: true,
  showHotspots: false,
  showLabels: false,
  showThrustVectors: true,
  animatePropellers: true,
  lightingIntensity: 1.0,
  ambientOcclusion: true,
  wireframeMode: false,
};

export default function App() {
  // Flight simulation state
  const [flightMode, setFlightMode] = useState<FlightMode>('VTOL');

  // Camera & view state
  const [activeView, setActiveView] = useState<CameraViewPreset | null>('iso');
  const [zoomTrigger, setZoomTrigger] = useState(0);
  const [zoomDelta, setZoomDelta] = useState(0);

  // Component exploded view state
  const [isExploded, setIsExploded] = useState(false);

  // Component selection, hover & isolation state
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedPartName, setSelectedPartName] = useState<string | null>(null);
  const [hoveredComponentId, setHoveredComponentId] = useState<string | null>(null);
  const [hoveredPartName, setHoveredPartName] = useState<string | null>(null);
  const [isolatedComponentId, setIsolatedComponentId] = useState<string | null>(null);

  // Filter & modal states
  const [selectedCategory, setSelectedCategory] = useState<SystemCategory>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [detailComponent, setDetailComponent] = useState<DroneComponent | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  // Viewer settings
  const [settings, setSettings] = useState<ViewerSettings>(DEFAULT_SETTINGS);

  const selectedComponent = getComponentById(selectedComponentId);
  const isolatedComponent = getComponentById(isolatedComponentId);

  // Toggle Exploded Component View
  const handleToggleExploded = useCallback(() => {
    setIsExploded((prev) => {
      const next = !prev;
      // If entering exploded view and no view is active, switch to null to let camera adjust to exploded framing
      setActiveView(null);
      return next;
    });
  }, []);

  // Handlers for Camera Views
  const handleSelectView = useCallback((view: CameraViewPreset) => {
    setActiveView(view);
    // Explicit view button overrides component camera zoom
    setIsolatedComponentId(null);
  }, []);

  const handleResetCamera = useCallback(() => {
    setActiveView('iso');
    setSelectedComponentId(null);
    setSelectedPartName(null);
    setIsolatedComponentId(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomDelta(-0.6);
    setZoomTrigger((prev) => prev + 1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomDelta(0.6);
    setZoomTrigger((prev) => prev + 1);
  }, []);

  const handleToggleAutoRotate = useCallback(() => {
    setSettings((prev) => ({ ...prev, autoRotate: !prev.autoRotate }));
  }, []);

  // Direct 3D Mesh Selection & Hover handlers
  const handleSelectComponent = useCallback((id: string, partName?: string) => {
    setSelectedComponentId(id);
    setSelectedPartName(partName || null);
    setActiveView(null); // allow camera to smoothly focus on the selected component
  }, []);

  const handleHoverComponent = useCallback((id: string | null, partName?: string | null) => {
    setHoveredComponentId(id);
    setHoveredPartName(partName || null);
  }, []);

  // When user clicks empty 3D space: remove selection, close panel
  const handleEmptySpaceClick = useCallback(() => {
    setSelectedComponentId(null);
    setSelectedPartName(null);
    setIsolatedComponentId(null);
    if (!isExploded) {
      setActiveView('iso');
    }
  }, [isExploded]);

  const handleToggleIsolate = useCallback(() => {
    if (isolatedComponentId) {
      setIsolatedComponentId(null);
    } else if (selectedComponentId) {
      setIsolatedComponentId(selectedComponentId);
    }
  }, [isolatedComponentId, selectedComponentId]);

  const handleLocateFromExplorer = useCallback((comp: DroneComponent) => {
    setSelectedComponentId(comp.id);
    setSelectedPartName(null);
    setIsolatedComponentId(comp.id);
    setActiveView(null);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col font-sans select-none">
      {/* 1. TOP AEROSPACE APPLICATION BAR */}
      <Header
        flightMode={flightMode}
        onSelectFlightMode={setFlightMode}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      {/* 2. MAIN 3D VIEWPORT CONTAINER */}
      <main className="relative flex-1 w-full h-[calc(100vh-64px)] overflow-hidden">
        {/* Exploded Mode Active Floating Banner */}
        {isExploded && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-2xl bg-sky-950/95 backdrop-blur-xl border border-sky-400/60 shadow-2xl text-sky-200 text-xs animate-in fade-in slide-in-from-top-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider">
              COMPONENT VIEW ACTIVE · <strong className="text-white font-semibold">CLICK ANY COMPONENT TO INSPECT</strong>
            </span>
            <button
              onClick={() => setIsExploded(false)}
              className="ml-1 sm:ml-2 px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] transition-colors cursor-pointer whitespace-nowrap shadow-md"
            >
              Assembled View
            </button>
          </div>
        )}

        {/* Isolated Component Notification Banner */}
        {isolatedComponent && !isExploded && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-2xl bg-sky-950/90 backdrop-blur-md border border-sky-500/50 shadow-2xl text-sky-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>
              ISOLATED COMPONENT: <strong className="text-white">{isolatedComponent.name}</strong>
            </span>
            <button
              onClick={() => setIsolatedComponentId(null)}
              className="ml-2 px-2.5 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] transition-colors cursor-pointer"
            >
              Exit Isolation
            </button>
          </div>
        )}

        {/* Small subtle cursor/pointer indication on hover */}
        {hoveredPartName && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-sky-400/40 text-xs text-sky-200 pointer-events-none shadow-xl flex items-center gap-2 animate-in fade-in duration-100">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="tracking-wide">
              Click to inspect: <strong className="text-white font-semibold">{hoveredPartName}</strong>
            </span>
          </div>
        )}

        {/* 3D Canvas */}
        <div className="w-full h-full">
          <Canvas
            shadows
            camera={{ position: [3.2, 1.8, 3.2], fov: 42 }}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onPointerMissed={handleEmptySpaceClick}
          >
            {/* Bright, clean neutral studio background */}
            <color attach="background" args={['#eef2f6']} />

            <Suspense fallback={null}>
              {/* Studio lighting, floor, circular grid & soft shadows */}
              <StudioEnvironment settings={settings} />

              {/* Drone 3D Aircraft Model with Exploded View & Component Interactions */}
              <DroneModel
                flightMode={flightMode}
                selectedComponentId={selectedComponentId}
                selectedPartName={selectedPartName}
                isolatedComponentId={isolatedComponentId}
                hoveredComponentId={hoveredComponentId}
                hoveredPartName={hoveredPartName}
                onSelectComponent={handleSelectComponent}
                onHoverComponent={handleHoverComponent}
                settings={settings}
                isExploded={isExploded}
              />

              {/* Aerodynamic Thrust Vectors (Active during assembled flight modes) */}
              <ThrustVectors
                flightMode={flightMode}
                visible={settings.showThrustVectors && !isExploded}
              />

              {/* Smooth Camera Orchestration with Direct Component Targeting & Exploded Framing */}
              <CameraController
                viewPreset={activeView}
                selectedComponent={selectedComponent}
                selectedPartName={selectedPartName}
                isolatedComponent={isolatedComponent}
                autoRotate={settings.autoRotate}
                autoRotateSpeed={settings.autoRotateSpeed}
                zoomTrigger={zoomTrigger}
                zoomDelta={zoomDelta}
                isExploded={isExploded}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Floating Quick Compass / Coordinate Legend */}
        <div className="absolute top-4 left-4 z-10 hidden sm:flex flex-col gap-1 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-400 pointer-events-none shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">SILENTRESQ-VTOL</span>
            <span className="text-orange-500 font-bold">2.4m</span>
          </div>
          <div className="text-[10px] text-slate-400">
            VIEW: <span className={isExploded ? "text-sky-400 font-semibold" : "text-slate-300 font-semibold"}>{isExploded ? 'EXPLODED COMPONENTS' : 'ASSEMBLED AIRCRAFT'}</span>
          </div>
          <div className="text-[10px] text-slate-400">
            MODE: <span className="text-sky-400 font-semibold">{flightMode}</span>
          </div>
          <div className="text-[10px] text-slate-400">
            SELECTED: <span className="text-emerald-400 font-semibold">{selectedComponent?.name.split(' ')[0] || 'NONE'}</span>
          </div>
        </div>

        {/* 3. FLOATING COMPONENT INFORMATION CARD / DETAIL PANEL */}
        <ComponentInfoCard
          key={selectedComponent?.id || 'none'}
          component={selectedComponent}
          partName={selectedPartName}
          isIsolated={isolatedComponentId === selectedComponentId}
          isExploded={isExploded}
          onClose={() => {
            setSelectedComponentId(null);
            setSelectedPartName(null);
            setIsolatedComponentId(null);
            if (!isExploded) {
              setActiveView('iso');
            }
          }}
          onOpenDetails={(comp) => setDetailComponent(comp)}
          onToggleIsolate={handleToggleIsolate}
          onResetSelection={() => {
            setSelectedComponentId(null);
            setSelectedPartName(null);
            setIsolatedComponentId(null);
            if (!isExploded) {
              setActiveView('iso');
            }
          }}
        />

        {/* 4. FLOATING BOTTOM 3D CONTROL BAR */}
        <ControlBar
          activeView={activeView}
          onSelectView={handleSelectView}
          autoRotate={settings.autoRotate}
          onToggleAutoRotate={handleToggleAutoRotate}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetCamera={handleResetCamera}
          settings={settings}
          onUpdateSettings={setSettings}
          isExploded={isExploded}
          onToggleExploded={handleToggleExploded}
        />
      </main>

      {/* 5. COLLAPSIBLE LEFT NAVIGATION PANEL */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeView={activeView}
        onSelectView={handleSelectView}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        components={DRONE_COMPONENTS}
        selectedComponentId={selectedComponentId}
        onSelectComponent={handleSelectComponent}
        onOpenExplorer={() => setIsExplorerOpen(true)}
      />

      {/* 6. FULL HARDWARE COMPONENT EXPLORER MODAL */}
      <ComponentExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        components={DRONE_COMPONENTS}
        onOpenDetails={(comp) => setDetailComponent(comp)}
        onSelectAndLocate={handleLocateFromExplorer}
      />

      {/* 7. DEDICATED 3D COMPONENT DETAIL VIEWER MODAL */}
      <ComponentDetailModal
        component={detailComponent}
        onClose={() => setDetailComponent(null)}
        onSelectComponent={(comp) => setDetailComponent(comp)}
        allComponents={DRONE_COMPONENTS}
      />

      {/* 8. DISPLAY & SCENE SETTINGS MODAL */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        onResetDefaults={() => setSettings(DEFAULT_SETTINGS)}
      />

      {/* 9. PLATFORM SPECIFICATIONS GUIDE MODAL */}
      <SpecificationsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />
    </div>
  );
}
