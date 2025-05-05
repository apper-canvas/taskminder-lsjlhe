import { useState } from 'react';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const ListIcon = getIcon('ListTodo');
  const CalendarIcon = getIcon('Calendar');
  const CheckIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  
  const tasks = {
    all: { count: 14, color: 'bg-primary/10 text-primary' },
    today: { count: 5, color: 'bg-accent/10 text-accent' },
    completed: { count: 8, color: 'bg-secondary/10 text-secondary' },
    upcoming: { count: 9, color: 'bg-yellow-500/10 text-yellow-500' },
  };
  
  const tabs = [
    { id: 'all', label: 'All Tasks', icon: ListIcon },
    { id: 'today', label: 'Today', icon: CalendarIcon },
    { id: 'completed', label: 'Completed', icon: CheckIcon },
    { id: 'upcoming', label: 'Upcoming', icon: ClockIcon },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-5">
          <div className="card shadow-soft dark:shadow-neu-dark">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </span>
                  <span className={`text-xs rounded-full px-2 py-1 ${
                    selectedTab === tab.id
                      ? 'bg-white/20 text-white'
                      : tasks[tab.id].color
                  }`}>
                    {tasks[tab.id].count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="card shadow-soft dark:shadow-neu-dark bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-primary">
                <ClockIcon size={16} />
              </span>
              <h3 className="text-sm font-medium">Quick Stats</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white/50 dark:bg-surface-800/50">
                <p className="text-xs text-surface-500">Completion Rate</p>
                <p className="text-lg font-semibold">67%</p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-surface-800/50">
                <p className="text-xs text-surface-500">Upcoming</p>
                <p className="text-lg font-semibold">9</p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-surface-800/50">
                <p className="text-xs text-surface-500">Overdue</p>
                <p className="text-lg font-semibold text-accent">2</p>
              </div>
              <div className="p-3 rounded-lg bg-white/50 dark:bg-surface-800/50">
                <p className="text-xs text-surface-500">In Progress</p>
                <p className="text-lg font-semibold">4</p>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card shadow-soft dark:shadow-neu-dark mb-6">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>
            <p className="text-surface-600 dark:text-surface-400 mb-2">
              Welcome to TaskMinder, your personal task management solution.
            </p>
            <p className="text-surface-500 dark:text-surface-500 text-sm">
              Create, organize, and complete your tasks efficiently.
            </p>
          </div>
          
          <MainFeature selectedTab={selectedTab} />
        </motion.div>
      </div>
    </div>
  );
}