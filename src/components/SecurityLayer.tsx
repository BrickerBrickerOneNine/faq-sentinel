
import React, { useEffect } from 'react';
import { toast } from "sonner";

interface SecurityLayerProps {
  children: React.ReactNode;
}

const SecurityLayer: React.FC<SecurityLayerProps> = ({ children }) => {
  useEffect(() => {
    // Prevent screenshots (works in some browsers)
    document.documentElement.style.webkitUserSelect = 'none';
    document.documentElement.style.mozUserSelect = 'none';
    document.documentElement.style.msUserSelect = 'none';
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
        // Prevent Ctrl+C, Ctrl+X
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
    
    // Disable developer tools via console (limited effectiveness, but a layer of security)
    const disableDevTools = () => {
      if (window.devtools && window.devtools.isOpen) {
        window.location.href = window.location.href;
      }
    };
    
    // Add listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('dragstart', handleDragStart);
    
    // Check developer tools periodically
    const interval = setInterval(disableDevTools, 1000);
    
    // Clean up
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      clearInterval(interval);
    };
  }, []);

  return <>{children}</>;
};

export default SecurityLayer;
