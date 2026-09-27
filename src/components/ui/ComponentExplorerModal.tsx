import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ExternalLink, 
  Eye, 
  Filter, 
  Layers, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DroneComponent, SystemCategory } from '../../types/drone';
import { SYSTEM_CATEGORIES } from '../../data/components';

interface ComponentExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  components: DroneComponent[];
  onOpenDetails: (component: DroneComponent) => void;
  onSelectAndLocate: (component: DroneComponent) => void;
}

export const ComponentExplorerModal: React.FC<ComponentExplorerModalProps> = ({
  isOpen,
  onClose,
  components,
  onOpenDetails,
  onSelectAndLocate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SystemCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredComponents = components.filter((comp) => {
    const matchesCat = selectedCategory === 'All' || comp.category === selectedCategory;
    const matchesSearch = 
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Header */}
        <div className="p-5 md:px-8 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                HARDWARE ARCHITECTURE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                19 Flight Hardware Systems
              </span>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-white mt-1">
              SilentResQ Component Explorer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 md:px-8 border-b border-slate-800/60 bg-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
            {SYSTEM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-orange-600 border-orange-500 text-white font-semibold shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components or roles..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Card Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComponents.map((comp) => (
              <div
                key={comp.id}
                className="group relative bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800 hover:border-sky-500/60 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between shadow-lg"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {comp.category}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-300">
                      Qty: {comp.quantity}
                    </span>
                  </div>

                  {/* Component Title */}
                  <h3 className="font-display text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                    {comp.name}
                  </h3>

                  {/* Purpose / Role */}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {comp.purpose}
                  </p>

                  {/* Approx Price */}
                  <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Approx. Price</span>
                    <span className="font-mono font-semibold text-emerald-400">{comp.approxPrice}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectAndLocate(comp);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>Locate in 3D</span>
                  </button>

                  <button
                    onClick={() => onOpenDetails(comp)}
                    className="flex-1 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-orange-950/30"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm">No hardware components found matching "{searchQuery}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
