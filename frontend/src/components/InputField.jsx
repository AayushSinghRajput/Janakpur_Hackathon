import { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle, Lock, Mail, User, Phone, MapPin, Calendar } from 'lucide-react';

const InputField = forwardRef(({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder,
  className = '',
  error,
  success,
  required = false,
  disabled = false,
  icon,
  fullWidth = true,
  showPasswordToggle = false,
  variant = 'default',
  helperText,
  ...props 
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getIconByType = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'password':
        return <Lock className="h-5 w-5" />;
      case 'tel':
        return <Phone className="h-5 w-5" />;
      case 'date':
      case 'datetime-local':
        return <Calendar className="h-5 w-5" />;
      case 'text':
        if (label?.toLowerCase().includes('name')) {
          return <User className="h-5 w-5" />;
        }
        if (label?.toLowerCase().includes('location')) {
          return <MapPin className="h-5 w-5" />;
        }
        break;
      default:
        return null;
    }
  };

  const inputType = type === 'password' && showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
  const InputIcon = getIconByType();

  const variants = {
    default: 'bg-[#f8f5fa] border-[#e5e0eb]',
    filled: 'bg-[#e5e0eb] border-[#d1c4e9]',
    ghost: 'bg-transparent border-[#e5e0eb]',
  };

  return (
    <div className={`mb-6 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-[#4a3366] mb-2">
          {label}
          {required && <span className="text-[#dc2626] ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {InputIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b7280]">
            {InputIcon}
          </div>
        )}

        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            ${fullWidth ? 'w-full' : ''}
            ${InputIcon ? 'pl-12' : 'pl-4'}
            ${showPasswordToggle || error || success ? 'pr-12' : 'pr-4'}
            py-3.5
            ${variants[variant]}
            border ${error ? 'border-[#dc2626]' : success ? 'border-[#059669]' : isFocused ? 'border-[#7c3aed]' : ''}
            rounded-xl
            text-[#2a2a3c]
            placeholder-[#6b7280]
            focus:outline-none
            focus:ring-2
            ${error ? 'focus:ring-[#dc2626]/20' : success ? 'focus:ring-[#059669]/20' : 'focus:ring-[#7c3aed]/20'}
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {error && !showPasswordToggle && (
            <AlertCircle className="h-5 w-5 text-[#dc2626]" />
          )}
          {success && !error && !showPasswordToggle && (
            <CheckCircle className="h-5 w-5 text-[#059669]" />
          )}

          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#6b7280] hover:text-[#7c3aed] transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
        </div>

        {isFocused && !error && !success && (
          <div className="absolute inset-0 border-2 border-[#7c3aed]/30 rounded-xl pointer-events-none -m-0.5"></div>
        )}
      </div>

      {(error || success || helperText) && (
        <div className="mt-2">
          {error && (
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-[#dc2626] flex-shrink-0" />
              <p className="text-sm text-[#dc2626]">{error}</p>
            </div>
          )}
          {success && !error && (
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-[#059669] flex-shrink-0" />
              <p className="text-sm text-[#059669]">{success}</p>
            </div>
          )}
          {helperText && !error && !success && (
            <p className="text-sm text-[#6b7280]">{helperText}</p>
          )}
        </div>
      )}

      {type === 'password' && value && !error && !success && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1">
            <span>Password strength:</span>
            <span className={value.length < 8 ? 'text-[#4a3366]' : value.length < 12 ? 'text-[#5b21b6]' : 'text-[#059669]'}>
              {value.length < 8 ? 'Weak' : value.length < 12 ? 'Good' : 'Strong'}
            </span>
          </div>
          <div className="h-1 bg-[#e5e0eb] rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                value.length < 8 ? 'bg-[#dc2626]' : 
                value.length < 12 ? 'bg-[#5b21b6]' : 
                'bg-[#059669]'
              }`}
              style={{ width: `${Math.min((value.length / 16) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;