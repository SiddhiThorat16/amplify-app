// amplify-app/frontend/src/components/Button.jsx

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  className = '',
  ...props 
}) => {
  const base = 'font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    outline: 'border-2 border-slate-700 hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm text-slate-200'
  };
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${loading ? 'opacity-75 cursor-not-allowed' : ''} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
