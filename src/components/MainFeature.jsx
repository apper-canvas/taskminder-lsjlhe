import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
  const ClipboardListIcon = getIcon('ClipboardList');
                <ClipboardListIcon size={48} />
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

export default function MainFeature({ selectedTab }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { 
        id: 1, 
        title: 'Complete project documentation',
        description: 'Write up final documentation for the client project',
        status: 'todo',
        priority: 'high',
        dueDate: '2023-08-20',
        category: 'work'
      },
      { 
        id: 2, 
        title: 'Buy groceries',
        description: 'Milk, eggs, bread, and vegetables',
        status: 'completed',
        priority: 'medium',
        dueDate: '2023-08-10', 
        category: 'personal'
      },
      { 
        id: 3, 
        title: 'Plan team meeting',
        description: 'Prepare agenda and send invites',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2023-08-15',
        category: 'work' 
      },
      { 
        id: 4, 
        title: 'Schedule dentist appointment',
        description: 'Call Dr. Smith for a check-up',
        status: 'todo',
        priority: 'low',
        dueDate: '2023-08-30',
        category: 'health' 
      },
    ];
  });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    category: 'personal'
  });
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  useEffect(() => {
    if (selectedTab === 'today') {
      setFilter('today');
    } else if (selectedTab === 'completed') {
      setFilter('completed');
    } else if (selectedTab === 'upcoming') {
      setFilter('upcoming');
    } else {
      setFilter('all');
    }
  }, [selectedTab]);
  
  const PlusIcon = getIcon('Plus');
  const PencilIcon = getIcon('Pencil');
  const TrashIcon = getIcon('Trash2');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const FilterIcon = getIcon('Filter');
  const SortIcon = getIcon('ArrowUpDown');
  const BriefcaseIcon = getIcon('Briefcase');
  const HeartIcon = getIcon('Heart');
  const ActivityIcon = getIcon('Activity');
  const FlagIcon = getIcon('Flag');
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return BriefcaseIcon;
      case 'personal': return HeartIcon;
      case 'health': return ActivityIcon;
      default: return BriefcaseIcon;
    }
  };
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-blue-500/10 text-blue-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'high': return 'bg-accent/10 text-accent';
      default: return 'bg-blue-500/10 text-blue-500';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'bg-blue-500/10 text-blue-500';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-500';
      case 'completed': return 'bg-secondary/10 text-secondary';
      default: return 'bg-blue-500/10 text-blue-500';
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };
  
  const resetForm = () => {
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: format(new Date(), 'yyyy-MM-dd'),
      category: 'personal'
    });
    setEditingTask(null);
    setIsFormOpen(false);
  };
  
  const addTask = (e) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    
    const task = {
      id: Date.now(),
      ...newTask,
      status: 'todo',
    };
    
    setTasks(prev => [task, ...prev]);
    toast.success("Task added successfully");
    resetForm();
  };
  
  const updateTask = (e) => {
    e.preventDefault();
    
    if (!editingTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    
    setTasks(prev => prev.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    
    toast.success("Task updated successfully");
    resetForm();
  };
  
  const toggleTaskStatus = (id) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
        toast.info(`Task marked as ${newStatus === 'completed' ? 'complete' : 'todo'}`);
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };
  
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success("Task deleted successfully");
    }
  };
  
  const startEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };
  
  const filteredTasks = tasks.filter(task => {
    const today = format(new Date(), 'yyyy-MM-dd');
    
    if (filter === 'completed') {
      return task.status === 'completed';
    } else if (filter === 'today') {
      return task.dueDate === today && task.status !== 'completed';
    } else if (filter === 'upcoming') {
      return task.dueDate > today && task.status !== 'completed';
    }
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">
          {filter === 'all' ? 'All Tasks' : 
           filter === 'completed' ? 'Completed Tasks' : 
           filter === 'today' ? 'Today\'s Tasks' : 'Upcoming Tasks'}
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <select 
              className="input pr-8 py-1.5 appearance-none"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-surface-500">
              <FilterIcon size={16} />
            </div>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="btn-primary py-1.5"
          >
            <PlusIcon size={16} className="mr-1" />
            <span>New Task</span>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button 
                onClick={resetForm}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <XIcon size={18} />
              </button>
            </div>
            
            <form onSubmit={editingTask ? updateTask : addTask} className="space-y-4">
              <div>
                <label htmlFor="title" className="label">Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={editingTask ? editingTask.title : newTask.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  className="input"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editingTask ? editingTask.description : newTask.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  rows="3"
                  className="input"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="priority" className="label">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={editingTask ? editingTask.priority : newTask.priority}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="label">Due Date</label>
                  <input
                    id="dueDate"
                    type="date"
                    name="dueDate"
                    value={editingTask ? editingTask.dueDate : newTask.dueDate}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="label">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={editingTask ? editingTask.category : newTask.category}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingTask ? 'Update Task' : 'Add Task'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="flex justify-center mb-4 text-surface-400">
              {filter === 'completed' ? (
                <CheckIcon size={48} />
              ) : (
                <getIcon('ClipboardList')({ size: 48 }) />
              )}
            </div>
            <h3 className="text-xl font-medium mb-2">No tasks found</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-4">
              {filter === 'all' 
                ? "You haven't created any tasks yet." 
                : filter === 'completed'
                ? "You haven't completed any tasks yet."
                : filter === 'today'
                ? "You don't have any tasks due today."
                : "You don't have any upcoming tasks."}
            </p>
            {filter !== 'all' && (
              <button 
                onClick={() => setFilter('all')}
                className="btn-outline"
              >
                View all tasks
              </button>
            )}
          </div>
        ) : (
          <motion.ul 
            className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <AnimatePresence>
              {filteredTasks.map(task => {
                const CategoryIcon = getCategoryIcon(task.category);
                
                return (
                  <motion.li 
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={`card group transition-all hover:shadow-lg ${
                      task.status === 'completed' ? 'opacity-80' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => toggleTaskStatus(task.id)}
                          className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border ${
                            task.status === 'completed'
                              ? 'bg-secondary border-secondary text-white'
                              : 'border-surface-300 dark:border-surface-600'
                          } flex items-center justify-center transition-colors`}
                        >
                          {task.status === 'completed' && <CheckIcon size={12} />}
                        </button>
                        
                        <div className="min-w-0">
                          <h3 className={`font-medium truncate ${
                            task.status === 'completed' ? 'line-through text-surface-500' : ''
                          }`}>
                            {task.title}
                          </h3>
                          
                          <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2 mt-1">
                            {task.description || 'No description provided'}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <span className={`badge flex items-center gap-1 ${getStatusColor(task.status)}`}>
                              <span className="h-2 w-2 rounded-full bg-current"></span>
                              <span className="capitalize">{task.status.replace('-', ' ')}</span>
                            </span>
                            
                            <span className={`badge flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                              <FlagIcon size={12} />
                              <span className="capitalize">{task.priority}</span>
                            </span>
                            
                            <span className="badge bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 flex items-center gap-1">
                              <CategoryIcon size={12} />
                              <span className="capitalize">{task.category}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => startEdit(task)}
                          className="p-1.5 rounded-full text-surface-500 hover:text-primary hover:bg-primary/10 transition-colors"
                          aria-label="Edit task"
                        >
                          <PencilIcon size={16} />
                        </button>
                        
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 rounded-full text-surface-500 hover:text-accent hover:bg-accent/10 transition-colors"
                          aria-label="Delete task"
                        >
                          <TrashIcon size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-surface-200 dark:border-surface-700 text-xs text-surface-500 flex justify-between">
                      <span>Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                      {task.status === 'completed' && <span>Completed</span>}
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}