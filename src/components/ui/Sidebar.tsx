import React, { useState } from 'react';
import { 
  ChevronRight, 
  Eye, 
  Compass, 
  Layers, 
  Cpu, 
  Search, 
  X, 
  Sparkles,
  Grid,
  ChevronDown
} from 'lucide-react';
import { CameraViewPreset, DroneComponent, SystemCategory } from '../../types/drone';
import { SYSTEM_CATEGORIES } from '../../data/components';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: CameraViewPreset | null;
  onSelectView: (view: CameraViewPreset) => void;
  selectedCategory: SystemCategory;
  onSelectCategory: (cat: SystemCategory) => void;
  components: DroneComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onOpenExplorer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeView,
  onSelectView,
  selectedCategory,
  onSelectCategory,
  components,
  selectedComponentId,
  onSelectComponent,
  onOpenExplorer
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<'drone' | 'systems' | 'components' | null>('drone');

  const filteredComponents = components.filter((comp) => {
    const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comp.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 left-0 top-16 z-20 w-80 md:w-88 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 text-slate-200 flex flex-col shadow-2xl transition-all duration-300">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold tracking-wider text-white text-base">
            SILENT<span className="text-orange-500">RESQ</span>
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            Professional Interactive 3D Drone Viewer
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Close Sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Section 1: DRONE VIEWS */}
        <div>
          <button
            onClick={() => setExpandedSection(expandedSection === 'drone' ? null : 'drone')}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 py-1"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-sky-400" />
              DRONE CAMERA VIEWS
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'drone' ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === 'drone' && (
            <div className="mt-2.5 grid grid-cols-2 gap-1.5">
              {[
                { id: 'iso', label: 'Overview 3/4' },
                { id: 'front', label: 'Front View' },
                { id: 'rear', label: 'Rear View' },
                { id: 'left', label: 'Left Side' },
                { id: 'right', label: 'Right Side' },
                { id: 'top', label: 'Top View' },
                { id: 'bottom', label: 'Bottom View' },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => onSelectView(view.id as CameraViewPreset)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer border ${
                    activeView === view.id
                      ? 'bg-sky-500/15 border-sky-400 text-white font-semibold shadow-sm'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: SYSTEMS */}
        <div>
          <button
            onClick={() => setExpandedSection(expandedSection === 'systems' ? null : 'systems')}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 py-1"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              AIRCRAFT SYSTEMS
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSection === 'systems' ? 'rotate-180' : ''}`} />
          </button>

          {expandedSection === 'systems' && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {SYSTEM_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-orange-600 border-orange-500 text-white font-semibold'
                      : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: HARDWARE COMPONENTS */}
        <div>
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Cpu className="w-4 h-4 text-emerald-400" />
              COMPONENTS ({filteredComponents.length})
            </span>
            <button
              onClick={onOpenExplorer}
              className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold cursor-pointer underline underline-offset-2"
            >
              Component Explorer →
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative mt-2">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 19+ hardware parts..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Component Mini List */}
          <div className="mt-2 space-y-1 max-h-64 overflow-y-auto pr-1">
            {filteredComponents.map((comp) => {
              const isSelected = selectedComponentId === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => onSelectComponent(comp.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-400/80 text-white'
                      : 'bg-slate-900/40 hover:bg-slate-800/80 border-transparent hover:border-slate-700/60 text-slate-300'
                  }`}
                >
                  <div className="truncate pr-2">
                    <p className="font-medium text-slate-200 truncate">{comp.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Qty: {comp.quantity} · {comp.category}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explorer Launcher Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <button
          onClick={onOpenExplorer}
          className="w-full py-2.5 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-orange-950/40"
        >
          <Grid className="w-4 h-4" />
          Open Full Hardware Explorer
        </button>
      </div>
    </aside>
  );
};
