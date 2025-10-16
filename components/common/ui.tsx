import React from 'react';

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200/80 dark:border-slate-700/50 overflow-hidden transition-all duration-300 ${className}`}>
    {children}
  </div>
);

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', size = 'md', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
    danger: 'bg-danger text-white hover:bg-red-600 focus:ring-danger',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:ring-secondary shadow-none',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  as?: 'input' | 'textarea';
  // FIX: Added optional 'rows' property to support textareas.
  rows?: number;
}
export const Input: React.FC<InputProps> = ({ label, id, as = 'input', ...props }) => {
    const commonClasses = "block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary sm:text-sm transition";
    const Element = as;

    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
            <Element
                id={id}
                className={commonClasses}
                {...(props as any)} // Cast to any to avoid type conflicts between input and textarea props
            />
        </div>
    );
};

// --- Select ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
}
export const Select: React.FC<SelectProps> = ({ label, id, children, ...props }) => (
  <div className="w-full">
    {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>}
    <select
      id={id}
      className="block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary sm:text-sm transition"
      {...props}
    >
      {children}
    </select>
  </div>
);

// --- Modal ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-light dark:bg-dark rounded-xl shadow-2xl w-full max-w-lg m-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-secondary dark:text-light">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};


// --- Badge ---
interface BadgeProps {
    children: React.ReactNode;
    color?: 'green' | 'yellow' | 'red' | 'blue' | 'gray';
    className?: string;
}
export const Badge: React.FC<BadgeProps> = ({ children, color = 'gray', className = '' }) => {
    const colorClasses = {
        green: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-200 dark:border-green-700/50',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700/50',
        red: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-200 dark:border-red-700/50',
        blue: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 border border-sky-200 dark:border-sky-700/50',
        gray: 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300 border border-slate-200 dark:border-slate-600/50'
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}>
            {children}
        </span>
    );
};

// --- Spinner ---
export const Spinner = ({ className = '' }: { className?: string }) => (
    <svg className={`animate-spin h-5 w-5 text-white ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);