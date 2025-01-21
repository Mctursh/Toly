import { useEffect, useState } from "react";

export const LoadingOrNotFound = ({ loading }: { loading: boolean }) => {
    const [showNotFound, setShowNotFound] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (loading) {
          setShowNotFound(true);
        }
      }, 5000);
  
      return () => clearTimeout(timer);
    }, [loading]);
  
    if (!loading) return null;
  
    return (
      <div className="flex justify-center items-center h-40">
        {showNotFound ? (
          <span>Tokens not found</span>
        ) : (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6FCB71]" />
        )}
      </div>
    );
  };