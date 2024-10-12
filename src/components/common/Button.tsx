import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  whileHover?: object;
  whileTap?: object;
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth, className, whileHover, whileTap, ...props }) => {
  const baseClasses = "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <motion.button
      className={`${baseClasses} ${widthClass} ${className || ''}`}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;