import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const HomeIcon = getIcon('Home');
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-accent"
      >
        <AlertTriangleIcon size={80} />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
      
      <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md">
        We couldn't find the page you're looking for. The link might be broken, or the page may have been removed.
      </p>
      
      <Link 
        to="/"
        className="btn-primary flex items-center space-x-2 shadow-lg shadow-primary/20"
      >
        <HomeIcon size={18} />
        <span>Return Home</span>
      </Link>
      
      <div className="mt-16 max-w-md">
        <div className="p-4 rounded-lg bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          <h3 className="text-lg font-medium mb-2">Quick Navigation</h3>
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
            Looking for one of these pages instead?
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link to="/" className="p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
              Dashboard
            </Link>
            <Link to="/" className="p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
              Tasks
            </Link>
            <Link to="/" className="p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
              Calendar
            </Link>
            <Link to="/" className="p-2 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
              Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}