import React, { useState, useRef, useEffect } from 'react';
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";
import { ChevronDown, Menu, Mic, Plus } from "lucide-react"
import { ActionBtn } from './ActionBtn';


const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileAttached, setFileAttached] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setIsActive(message.trim() !== '' || fileAttached);
  }, [message, fileAttached]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileAttached(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isActive) return;

    // Handle message submission here
    const newMessage = {
      text: message,
      file: file ? file.name : null,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setFile(null);
    setFileAttached(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSearch = () => {
    alert('Search functionality to be implemented');
  };

  const handleReason = () => {
    alert('Reason functionality to be implemented');
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-2xl font-semibold text-center mb-6">What can I help with?</h1>

    
    <div className="container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div>{msg.text}</div>
            {msg.file && <div className="fileInfo">Attached: {msg.file}</div>}
            <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="textInput"
          />
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          
          {fileAttached && (
            <div className="fileName">
              {file.name}
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setFileAttached(false);
                  fileInputRef.current.value = '';
                }}
                className="clearFile"
              >
                <IoCloseCircleSharp size={24}/>
              </button>
            </div>
          )}
        </div>
        
        <div className="buttonGroup">
          <div className='btn-opt'>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="fileButton"
          >
              <Plus  />
          </button>
          <button
            type="button"
            onClick={handleSearch}
            className="searchButton"
          >
            Web
          </button>
          <button
            type="button"
            onClick={handleReason}
            className="reasonButton"
          >
            Reason
          </button>
        </div>
        <div>
          <button
            type="submit"
            className={isActive ? 'activeButton' : 'inactiveButton'}
            disabled={!isActive}
          >
            <FaCircleArrowUp size={32}/>
          </button>
          </div>
          </div>
      </form>
    </div>
    <ActionBtn/>
    </main>

  );
};

export default ChatInput;