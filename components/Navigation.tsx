
import React from 'react';
import { Search, Menu } from 'lucide-react';
import { WavyDivider } from '../constants';

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['Dashboard', 'Planner', 'Performance', 'Analytics', 'AI Spark'];

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <nav className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-gray-100">
        <div className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight">AcademiFlow</span>
        </div>
        
        <div className="hidden md:flex items-center gap-1">
          {tabs.map((tab, idx) => (
            <React.Fragment key={tab}>
              <button
                onClick={() => onTabChange(tab)}
                className={`px-5 py-2 rounded-full transition-all duration-300 font-medium ${
                  activeTab === tab 
                    ? 'bg-black text-white shadow-lg scale-105' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {tab}
              </button>
              {idx < tabs.length - 1 && <WavyDivider />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
