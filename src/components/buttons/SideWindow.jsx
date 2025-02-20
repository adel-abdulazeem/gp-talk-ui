import { useState, useEffect } from 'react';
import { PanelRightClose, Menu, X } from 'lucide-react'; // Import X icon



export default function SideWindow() {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div>
            <button className="sidebar-button" onClick={toggleSidebar}>
                {isMobile ? <Menu /> : <PanelRightClose />}
            </button>
            <div className={`main-nav sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div>
                    </div>
                    <button className='close-button' onClick={closeSidebar}>
                        <X />
                    </button>
                </div>
            </div>
        </div>
    );
}