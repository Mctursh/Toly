import React, { useState, useEffect } from 'react';

interface LoadingOrNotFoundProps {
  loading: boolean;
  borderColor?: 'green' | 'blue' | 'red' | 'yellow' | 'purple' | 'gray';
  text: string;
}

export const LoadingOrNotFound = ({ 
  loading, 
  borderColor = 'green',
  text,
}: LoadingOrNotFoundProps) => {
  const [showNotFound, setShowNotFound] = useState(false);

  if (!loading) return null;

  const getBorderColorClass = () => {
    const colorMap = {
      green: '#6FCB71',
      blue: '#92C7FF]',
      red: 'border-red-500',
      yellow: 'border-yellow-500',
      purple: 'border-purple-500',
      gray: 'border-gray-500'
    };
    return colorMap[borderColor];
  };

  return (
    <div className="flex justify-center items-center h-40">
      {showNotFound ? (
        <span>{text}</span>
      ) : (
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${getBorderColorClass()}`} />
      )}
    </div>
  );
};

export default LoadingOrNotFound;

  // <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6FCB71]" />