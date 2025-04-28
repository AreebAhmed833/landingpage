import React from 'react';
import { useTheme } from '../context/ThemeContext';
import neovannceLogo from '../neovannce.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const { isDarkMode } = useTheme();
  
  const sizeClasses = {
    small: 'h-10 w-auto',
    medium: 'h-16 w-auto',
    large: 'h-20 w-auto'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={neovannceLogo} 
        alt="Neovannce Logo" 
        className={`${sizeClasses[size]} brightness-100`}
      />
    </div>
  );
} 