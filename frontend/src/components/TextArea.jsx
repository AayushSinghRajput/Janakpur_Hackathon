import { forwardRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const TextArea = forwardRef(({ 
  label, 
  value, 
  onChange, 
  placeholder,
  rows = 4,
  className = '',
  error,
  success,
  required = false,
  disabled = false,
  maxLength,
  showCount = false,
  ...props 
}, ref) => {
  const remainingChars = maxLength ? maxLength - (value?.length || 0) : null;

  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-medium text-[#4a3366] mb-2">
          {label}
          {required && <span className="text-[#dc2626] ml-1">*</span>}
          {showCount && maxLength && (
            <span className="float-right text-xs font-normal text-[#6b7280]">
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 
            bg-[#f8f5fa] 
            border ${error ? 'border-[#dc2626]' : success ? 'border-[#059669]' : 'border-[#e5e0eb]'}
            rounded-xl 
            text-[#2a2a3c] 
            placeholder-[#6b7280]
            focus:outline-none 
            focus:ring-2 
            ${error ? 'focus:ring-[#dc2626]/20' : success ? 'focus:ring-[#059669]/20' : 'focus:ring-[#7c3aed]/20'}
            focus:border-[#7c3aed]
            transition-all duration-300
            resize-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <div className="absolute right-3 top-3">
            <AlertCircle className="h-5 w-5 text-[#dc2626]" />
          </div>
        )}
        
        {success && !error && (
          <div className="absolute right-3 top-3">
            <CheckCircle className="h-5 w-5 text-[#059669]" />
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-[#dc2626] flex-shrink-0" />
          <p className="text-sm text-[#dc2626]">{error}</p>
        </div>
      )}
      
      {success && !error && (
        <div className="mt-2 flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-[#059669] flex-shrink-0" />
          <p className="text-sm text-[#059669]">{success}</p>
        </div>
      )}
      
      {remainingChars !== null && remainingChars < 50 && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <span>Characters remaining:</span>
            <span className={remainingChars < 20 ? 'text-[#5b21b6]' : remainingChars < 10 ? 'text-[#dc2626]' : ''}>
              {remainingChars}
            </span>
          </div>
          <div className="mt-1 h-1 bg-[#e5e0eb] rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                remainingChars < 10 ? 'bg-[#dc2626]' : 
                remainingChars < 20 ? 'bg-[#5b21b6]' : 
                remainingChars < 50 ? 'bg-[#7c3aed]' : 'bg-[#059669]'
              }`}
              style={{ width: `${((maxLength - remainingChars) / maxLength) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;