import React, { useState, useRef, useEffect } from 'react';
import { IoCloseCircleSharp } from "react-icons/io5";
import { CircleArrowUp, Plus } from "lucide-react"
import { ActionBtn } from './ActionBtn';


const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileAttached, setFileAttached] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const textAreaRef = useRef(null);

  
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
      expanded: false 
    };
    setMessages([...messages, newMessage]);
    setMessage('');
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '3rem'; 
    }

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

  const messagesEndRef = useRef(null);
  const toggleExpand = (index) => {
    setMessages(messages.map((msg, i) => 
      i === index ? { ...msg, expanded: !msg.expanded } : msg
    ));
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Add this useEffect hook


  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-center mb-10">What can I help with?</h1>
        <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className={`message-content ${!msg.expanded ? 'collapsed' : ''}`}>
              {msg.text}
            </div>
            {!msg.expanded && (
              <button 
                onClick={() => toggleExpand(index)}
                className="see-more-btn"
              >
                See more
              </button>
            )}
            {msg.file && <div className="fileInfo">Attached: {msg.file}</div>}
            <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <textarea
              ref={textAreaRef} // Add this ref attribute
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              // Auto-resize logic
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder="Type a message..."
            className="textInput"
            rows={1}
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
              <Plus  size={32}/>
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
            <CircleArrowUp size={48}/>
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