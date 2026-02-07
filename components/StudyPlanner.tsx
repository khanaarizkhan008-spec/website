
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Copy, Plus, BookOpen, Laptop, PenTool, CheckCircle2 } from 'lucide-react';
import { SUBJECTS, STUDY_PLANS, WavyUnderline } from '../constants';

const StudyPlanner: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="font-display text-6xl md:text-7xl mb-4 tracking-tight">
            Plan Your <br />
            <span className="italic">Study Time</span>
          </h1>
          <div className="w-48">
            <WavyUnderline color="#000" />
          </div>
          <p className="text-gray-500 mt-6 text-xl">Transform hours into achievements</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 rounded-full shadow-lg border border-gray-50">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <span className="font-display text-xl font-bold">Feb 3 - 9, 2026</span>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight className="w-5 h-5" /></button>
          <div className="w-px h-6 bg-gray-100 mx-2" />
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors text-sm font-medium">
            <Copy className="w-4 h-4" /> Copy Previous
          </button>
          <button className="bg-black text-white flex items-center gap-2 px-6 py-2 rounded-full shadow-xl hover:scale-105 transition-transform text-sm font-bold">
            <Plus className="w-4 h-4" /> New Block
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weekly Calendar */}
        <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {days.map((day, idx) => (
            <div key={day} className="space-y-4">
              <div className="text-center">
                <span className="font-display text-2xl">{day}</span>
                <div className="h-1 bg-gray-100 rounded-full mt-2 mx-auto w-12" />
              </div>
              <div className="space-y-4">
                {/* Mock blocks for demonstration */}
                {idx === 0 && (
                  <>
                    <StudyBlock 
                      subject={SUBJECTS[0]} 
                      topic="BST Implement" 
                      time="09:00 - 11:00" 
                      type="practice" 
                      completed={true}
                    />
                    <StudyBlock 
                      subject={SUBJECTS[1]} 
                      topic="Normalization" 
                      time="14:00 - 16:00" 
                      type="reading" 
                      completed={true}
                    />
                  </>
                )}
                {idx === 1 && (
                  <>
                    <StudyBlock 
                      subject={SUBJECTS[2]} 
                      topic="React State" 
                      time="10:00 - 11:30" 
                      type="practice" 
                      completed={true}
                    />
                    <StudyBlock 
                      subject={SUBJECTS[3]} 
                      topic="SQL Queries" 
                      time="15:00 - 17:00" 
                      type="lab" 
                      completed={true}
                    />
                  </>
                )}
                {idx === 2 && (
                  <StudyBlock 
                    subject={SUBJECTS[0]} 
                    topic="AVL Rotations" 
                    time="09:00 - 11:00" 
                    type="practice" 
                    completed={false}
                  />
                )}
                <button className="w-full h-32 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center gap-2 text-gray-300 hover:border-gray-200 hover:text-gray-400 transition-all group">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-100 flex items-center justify-center group-hover:border-gray-200">
                    <Plus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase">Add Block</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-3 space-y-8 bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 sticky top-32">
          <div>
            <h3 className="font-display text-2xl mb-4">Week Summary</h3>
            <WavyUnderline color="#F3F4F6" />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-gray-400 text-xs font-mono uppercase mb-1">Total Planned</p>
              <p className="text-4xl font-mono font-bold">32 hrs</p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 text-xs font-mono uppercase">By Subject</p>
              {SUBJECTS.map(sub => (
                <div key={sub.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span>{sub.name.split(' ')[0]}</span>
                    <span>{sub.plannedHoursPerWeek}h</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(sub.plannedHoursPerWeek / 8) * 100}%` }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: sub.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Completion Rate</span>
                <span className="text-green-600 font-bold text-sm">↗ +8%</span>
              </div>
              <div className="text-3xl font-mono font-bold">72%</div>
            </div>

            <button className="w-full bg-black text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              View Analytics <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudyBlock = ({ subject, topic, time, type, completed }: any) => {
  const Icon = type === 'practice' ? Laptop : type === 'reading' ? BookOpen : PenTool;

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      className={`rounded-[32px] p-5 shadow-sm border-l-4 transition-all relative group cursor-pointer ${
        completed ? 'bg-gray-50/50' : 'bg-white'
      }`}
      style={{ borderLeftColor: subject.color }}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-sm leading-tight pr-2">{subject.name}</h4>
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-black" />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-400" />
        )}
      </div>
      <div className="h-px w-12 mb-3" style={{ backgroundColor: subject.color }} />
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <Icon className="w-3 h-3 text-gray-400" />
          <span className="text-xs font-medium truncate">{topic}</span>
        </div>
        <div className="font-mono text-[10px] text-gray-400 uppercase tracking-tight">
          {time}
        </div>
      </div>
    </motion.div>
  );
};

export default StudyPlanner;
