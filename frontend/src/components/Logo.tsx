import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const { isDarkMode } = useTheme();
  
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl'
  };

  return (
    <div className={`font-serif ${sizeClasses[size]} ${className}`}>
      <span className="font-bold bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">NEO</span>
      <span className={`font-light ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>VANNCE</span>
    </div>
  );
} 