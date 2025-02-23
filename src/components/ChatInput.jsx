import React, { useState, useRef, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid'

import { ActionBtn } from './buttons/ActionBtn';
import { AuthContext } from "./auth/AuthContext";
import MessageList from './chat/MessageList'
import ChatForm from './chat/ChatForm'

const ChatInput = () => {

  const {user} = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileAttached, setFileAttached] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isActive) return;

    // Create user message with ID
    const userMessage = {
      id: nanoid(),
      text: message,
      role: 'user',
      timestamp: new Date().toISOString(),
      expanded: false
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/generate/', {
        method: 'POST',
        credentials: "include",   
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          userId: user.id
        })
      });

      const responseData = await response.json();

      if (!response.ok) throw new Error('Request failed');

      // Create bot message with ID
      const botMessage = {
        id: nanoid(),
        text: responseData.data.response,
        role: 'bot',
        timestamp: new Date().toISOString(),
        expanded: false
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
      id: nanoid(),
      text: error.message || 'Error getting response',
      role: 'error',
      timestamp: new Date().toISOString(),
      expanded: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setMessage('');
      setFile(null);
      setFileAttached(false);
      if (textAreaRef.current) textAreaRef.current.style.height='3rem';
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
  const toggleExpand = (id) => {
    setMessages(messages.map((msg) => 
      msg.id === id ? { ...msg, expanded: !msg.expanded } : msg
    ));
  };
  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-center mb-10">What can I help with?</h1>
            <MessageList messages={messages} toggleExpand={toggleExpand} />
            <ChatForm
            message={message}
            setMessage={setMessage}
            file={file}
            fileAttached={fileAttached}
            isActive={isActive}
            fileInputRef={fileInputRef}
            textAreaRef={textAreaRef}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            handleClearFile={() => {
              setFile(null);
              setFileAttached(false);
              fileInputRef.current.value = '';
            }}
            />
    <ActionBtn/>
    </main>
  );
};

export default ChatInput;




