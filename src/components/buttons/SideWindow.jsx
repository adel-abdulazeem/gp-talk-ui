import { useState, useEffect, useContext } from 'react';
import { PanelRightClose, Menu, X } from 'lucide-react'; // Import X icon
import { AuthContext } from "../auth/AuthContext";

export default function SideWindow() {
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState([])
  const { darkMode } = useContext(AuthContext);

    useEffect(() => {
        const fetchHist = () => {
           // http://localhost:3000/generate/responses/${user.id} 
        fetch(``)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch subscriber details");
          }
          return response.json(); 
        })
        .then((data) => {
            console.log(data)
          })
        .catch((error) => {
          setError(error.message); 
        })
    }    
    fetchHist(); 

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
                        GPTalk
                    </div>
                    <button className='close-button' onClick={closeSidebar}>
                        <X />
                    </button>
                </div>
            </div>
        </>
    );
}