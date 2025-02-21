import { useState, useEffect, useContext } from 'react';
import { PanelRightClose, Menu, X } from 'lucide-react'; // Import X icon
import { AuthContext } from "../auth/AuthContext";


export default function SideWindow() {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(AuthContext);

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
        <>
            <button className="sidebar-button" onClick={toggleSidebar}>
                {isMobile ? <Menu /> : <PanelRightClose />}
            </button>
            <div className={
                `main-nav sidebar 
                ${isSidebarOpen ? 'open' : ''}
                ${darkMode? 'dark' : 'light'}
                `
                }>
                <div className="sidebar-header">
                    <div>
                    </div>
                    <button className='close-button' onClick={closeSidebar}>
                        <X />
                    </button>
                </div>
            </div>
        </>
    );
}