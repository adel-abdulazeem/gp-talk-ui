import { useState, useEffect } from 'react';
import { PanelRightClose, Menu } from 'lucide-react';

export default function SideWindow(){
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 640); // Tailwind's 'sm' breakpoint
        };
        // Initial check
        handleResize();
        window.addEventListener('resize', handleResize);
            // Cleanup
    return () => window.removeEventListener('resize', handleResize);
}, []);

    return (
        <button>
{isMobile ? (
    // Mobile icon (hamburger menu)
    <Menu />
  ) : (
    // Desktop icon (different icon)
    <PanelRightClose />
  )}
        </button>
    )
}









