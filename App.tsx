
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import StudyPlanner from './components/StudyPlanner';
import PerformanceTracker from './components/PerformanceTracker';
import AISpark from './components/AISpark';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <Dashboard />;
      case 'Planner': return <StudyPlanner />;
      case 'Performance': return <PerformanceTracker />;
      case 'AI Spark': return <AISpark />;
      case 'Analytics': return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <h2 className="font-display text-5xl">Coming Soon</h2>
          <p className="text-gray-500 max-w-md text-center">Advanced correlation analytics between study hours and exam performance is currently being synchronized.</p>
          <button onClick={() => setActiveTab('Dashboard')} className="bg-black text-white px-8 py-3 rounded-full font-bold">Back to Dashboard</button>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-display text-2xl font-bold italic">AcademiFlow</div>
          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            Organic Brutalist Design System v1.0
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
