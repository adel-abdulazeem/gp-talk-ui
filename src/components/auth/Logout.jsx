import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const Logout = (props) => {
    const { logout } = useContext(AuthContext);  
  const handleLogout = async () => {

    try {
      const response = await fetch("https://gptalk-api.onrender.com/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
      });
    } catch(error){
      console.error('Error during logout:', error);
    }
    logout()
    props.onClose()
  };

  const handleCancel = () => {
    props.onClose()
  };
  return (
    <>
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Popup */}
      <div className="confirmation-modal bg-gray-100 dark:bg-gray-900">
        <p>Are you sure you want to log out?</p>
        <div className="button-container">
          <button className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="confirm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;