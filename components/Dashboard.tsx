
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Flame, Zap, BarChart3, ArrowUpRight, BookOpen, Laptop, PenTool } from 'lucide-react';
import { WEEKLY_STATS, INSIGHTS, WavyUnderline } from '../constants';

const Dashboard: React.FC = () => {
  const currentWeek = WEEKLY_STATS[WEEKLY_STATS.length - 1];
  const progressData = [
    { name: 'Completed', value: currentWeek.completedHours },
    { name: 'Remaining', value: currentWeek.plannedHours - currentWeek.completedHours }
  ];
  const COLORS = ['#000000', '#F3F4F6'];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-64 flex flex-col justify-center overflow-hidden">
        <div className="absolute -left-20 top-0 w-80 h-80 organic-blob opacity-40 -z-10" />
        <h1 className="font-display text-6xl md:text-7xl mb-4 tracking-tight">
          Your Academic <br />
          <span className="italic">Journey</span>
          <span className="inline-block ml-4 text-4xl">∞</span>
        </h1>
        <div className="w-48">
          <WavyUnderline color="#000" />
        </div>
        <p className="text-gray-500 mt-6 text-xl">Planning your success, one hour at a time</p>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Progress Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-4 bg-white rounded-[40px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col items-center justify-between border border-gray-50"
        >
          <div className="w-full text-left mb-4">
            <h3 className="font-display text-2xl">This Week Progress</h3>
            <WavyUnderline color="#E5E7EB" />
          </div>
          
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-mono font-bold">{Math.round((currentWeek.completedHours / currentWeek.plannedHours) * 100)}%</span>
              <span className="text-xs text-gray-400 font-mono">DONE</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-4 mt-8 font-mono text-sm">
            <div className="text-gray-500">
              <div className="text-black font-bold">{currentWeek.plannedHours} hrs</div>
              planned
            </div>
            <div className="text-gray-500 text-right">
              <div className="text-black font-bold">{currentWeek.completedHours} hrs</div>
              completed
            </div>
          </div>
        </motion.div>

        {/* Stats and Schedule */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-2 gap-6">
            <StatCard icon={<Flame className="text-orange-500" />} label="Study Streak" value="7 Days" trend="+2" />
            <StatCard icon={<Zap className="text-yellow-500" />} label="Efficiency" value="82%" trend="+5%" />
            <StatCard icon={<BarChart3 className="text-blue-500" />} label="Subjects" value="5" trend="Stable" />
            <div className="bg-blue-50 rounded-[32px] p-6 flex items-center justify-center group cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />
              <div className="z-10 text-center">
                <p className="text-blue-600 font-bold mb-1">View Detailed</p>
                <p className="text-blue-600 font-bold">Insights ↗</p>
              </div>
            </div>
          </div>

          {/* Today's Schedule Card */}
          <div className="bg-white rounded-[40px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-50 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-2xl">Today's Schedule</h3>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Live</span>
            </div>
            <div className="space-y-6">
              <ScheduleItem time="09:00 - 11:00" title="Data Structures" task="BST Implementation" type="practice" color="#3B82F6" />
              <div className="relative py-2">
                <div className="absolute left-0 right-0 h-px bg-red-100 top-1/2" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500" />
              </div>
              <ScheduleItem time="14:00 - 16:00" title="DBMS" task="Normalization" type="reading" color="#6366F1" />
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-12 bg-black rounded-[40px] p-10 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h3 className="font-display text-3xl mb-2">Weekly Study Effectiveness</h3>
              <p className="text-gray-400 font-mono text-sm">↗ 12% improvement over last month</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-full px-4 py-2 text-xs font-mono">
              LAST 4 WEEKS
            </div>
          </div>
          
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_STATS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="weekNumber" stroke="#666" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} format={(val) => `Week ${val}`} />
                <YAxis stroke="#666" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke="#fff" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#fff' }} 
                  activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Insights Section */}
        <div className="md:col-span-12">
          <div className="bg-[#F9FAFB] rounded-[40px] p-10 relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-3xl">Planning Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INSIGHTS.map((insight, idx) => (
                <div key={idx} className="space-y-3 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                  <div className="text-xs font-mono text-gray-400 uppercase">{insight.type.replace('_', ' ')}</div>
                  <p className="font-medium text-lg leading-snug">{insight.text}</p>
                  <div className="pt-2">
                    <button className="flex items-center gap-1 text-sm font-bold border-b border-black">
                      Take Action <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50"
  >
    <div className="mb-3">{icon}</div>
    <div className="font-mono text-3xl font-bold mb-1">{value}</div>
    <p className="text-gray-400 text-sm mb-2">{label}</p>
    <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
      {trend} <span className="text-gray-300 font-normal">vs last week</span>
    </div>
  </motion.div>
);

const ScheduleItem = ({ time, title, task, color }: any) => (
  <div className="flex items-start gap-4">
    <div className="font-mono text-xs text-gray-400 mt-1 whitespace-nowrap">{time.split(' - ')[0]}</div>
    <div className="flex-1">
      <div className="bg-gray-50 rounded-2xl p-4 border-l-4" style={{ borderColor: color }}>
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          {task.includes('Practice') ? <Laptop className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
          {task}
        </p>
      </div>
    </div>
  </div>
);

export default Dashboard;
