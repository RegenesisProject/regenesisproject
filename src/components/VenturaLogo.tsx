import React from 'react';

interface VenturaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  textColor?: string;
  showText?: boolean;
}

export const VenturaLogo: React.FC<VenturaLogoProps> = ({ size = 'sm', textColor = 'text-[#e2b13d]', showText = false }) => {
  const sizeClasses = size === 'lg' ? 'w-12 h-12' : size === 'md' ? 'w-10 h-10' : 'w-8 h-8';
  return (
    <div className="flex items-center gap-2">
      <img 
        src="https://res.cloudinary.com/ew2ztpgz/image/upload/v1784752107/Ventura_logo_version_2_3_copy_2_dt5rra.png" 
        alt="Thomas Ventura Logo" 
        className={`${sizeClasses} object-contain`}
      />
      {showText && <span className={`font-serif font-bold ${textColor}`}>THOMAS VENTURA</span>}
    </div>
  );
};
