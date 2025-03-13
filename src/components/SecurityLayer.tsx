
import React, { useEffect } from 'react';
import { toast } from "sonner";

interface SecurityLayerProps {
  children: React.ReactNode;
}

const SecurityLayer: React.FC<SecurityLayerProps> = ({ children }) => {
  useEffect(() => {
    // Prevent text selection (more standard approach)
    document.documentElement.style.userSelect = 'none';
    
    // Prevent context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning("Right-click is disabled for security reasons");
      return false;
    };
    
    // Prevent keyboard shortcuts for copy, print, save
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        // Prevent Ctrl+C, Ctrl+X, Ctrl+P, Ctrl+S
        (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'p' || e.key === 's')) ||
        // Prevent print screen
        e.key === 'PrintScreen' ||
        // Prevent F12 for dev tools
        e.key === 'F12'
      ) {
        e.preventDefault();
        toast.warning("This action is disabled for security reasons");
        return false;
      }
    };

    // Prevent copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      toast.warning("Copying content is disabled for security reasons");
      return false;
    };
    
    // Prevent drag for images
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };
    
    // Enhanced screenshot detection
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // When tab loses focus (potential screenshot attempt)
        document.body.classList.add('blur-content');
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            toast.warning("Screen capture detected");
          }
          document.body.classList.remove('blur-content');
        }, 300);
      }
    };

    // Add mutation observer to detect if someone is trying to modify the security settings
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target === document.documentElement && 
            mutation.attributeName === 'style') {
          // Re-apply security styles if they were changed
          document.documentElement.style.userSelect = 'none';
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Add listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="screenshot-protection">
      {children}
      <div className="security-overlay"></div>
    </div>
  );
};

export default SecurityLayer;
