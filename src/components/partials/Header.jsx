import { useState, useContext } from "react";

import { AuthContext } from "../auth/AuthContext";
import DarkMode from "../buttons/DarkMode";
import NewChat from "../buttons/NewChat";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Logout from '../auth/Logout'

const Header = () => {  
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {isAuthenticated, user} = useContext(AuthContext);
    return (
      <header className="main-header sticky top-0 z-50">
        <nav className="main-nav">
            <ul>
                <li>
                </li>
                <a href="https://gp-chat-ai-ui.netlify.app">
                <li>
                  GPTalk-AI
                </li>
                </a>
                <div className="action-buttons">
                  <li >
                    <NewChat/>
                  </li>
                </div>
                <div>
                  {isAuthenticated?                   
                    (
                      <div className="relative">
                        <button 
                          className="user-button"
                          onClick={() => setShowDropdown(!showDropdown)}
                        >{user?.userName}
                          <span className="dropdown-arrow">▼</span>
                        </button>
                        {showDropdown && (
                          <div className="dropdown-menu">
                            <button 
                              className="dropdown-item formBtn"
                              onClick={() => {
                                setShowLogout( prev => !prev)
                                setShowDropdown(false);
                              }}
                            >
                              Logout
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  : (
                   <>
                    <button 
                      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 formBtn"                    
                      onClick={() => setShowLogin( prev => !prev)}>
                      Login</button>
                    <button 
                    className="formBtn"
                    onClick={() => setShowSignup( prev => !prev)}>
                      Sign-Up</button>
                   </> 
                    )}
                </div>
                <li>
                  <DarkMode/>
                </li>
            </ul>
        </nav>
        {showLogin && 
        <Login 
        onClose={ () => setShowLogin(false)}
        show={() => setShowSignup( false)}
        />}
        {showSignup && 
        <Signup onClose={ () => setShowSignup(false)}
        />}
        {showLogout && 
        <Logout onClose={ () => setShowLogout(false)}
        />}
      </header>
    );
  };

  export default Header