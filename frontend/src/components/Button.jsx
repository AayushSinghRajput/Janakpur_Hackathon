import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  ...props 
}, ref) => {
  
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#f8f5fa] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#7c3aed] to-[#5b21b6] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white shadow-lg hover:shadow-xl hover:shadow-[#7c3aed]/20 focus:ring-[#7c3aed]',
    secondary: 'bg-white hover:bg-[#f8f5fa] text-[#2a2a3c] border border-[#e5e0eb] hover:border-[#7c3aed]/50 shadow-sm hover:shadow-md focus:ring-[#7c3aed]',
    danger: 'bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white shadow-lg hover:shadow-xl hover:shadow-[#dc2626]/20 focus:ring-[#dc2626]',
    ghost: 'bg-transparent hover:bg-[#e5e0eb] text-[#4a3366] hover:text-[#2a2a3c] border border-[#e5e0eb] hover:border-[#7c3aed]/50 focus:ring-[#7c3aed]',
    success: 'bg-gradient-to-r from-[#059669] to-[#047857] hover:from-[#10b981] hover:to-[#059669] text-white shadow-lg hover:shadow-xl hover:shadow-[#059669]/20 focus:ring-[#059669]',
  };
  
  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthStyle}
        ${className}
        ${loading ? 'cursor-wait' : ''}
        transform hover:scale-[1.02] active:scale-[0.98]
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-5 w-5 mr-2" />}
          {children}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;