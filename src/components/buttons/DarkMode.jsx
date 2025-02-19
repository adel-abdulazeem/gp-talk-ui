import React, { useState, useContext } from "react";

import { AuthContext } from "../auth/AuthContext";

export default  function DarkMode () {
  const { darkMode, toggleDarkMode } = useContext(AuthContext);

  return (
    <div className="">
      <button 
        onClick={toggleDarkMode}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900"
      >
        {darkMode ? '🌞 Light' : '🌙 Dark'}
      </button>
    </div>  );
};


