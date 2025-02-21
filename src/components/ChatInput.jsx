import React, { useState, useRef, useEffect } from 'react';
import { ActionBtn } from './ActionBtn';
import { nanoid } from 'nanoid'

import MessageList from './chat/MessageList'
import ChatForm from './chat/ChatForm'
const ChatInput = () => {
  
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [fileAttached, setFileAttached] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isActive) return;

    const newMessage = {
      id: nanoid(),
      text: message,
      file: file ? file.name : null,
      timestamp: new Date().toISOString(),
      expanded: false 
    };
console.log(newMessage.id)
    setMessages([...messages, newMessage]);
    setMessage('');
    setFile(null);
    setFileAttached(false);

    if (textAreaRef.current) textAreaRef.current.style.height='3rem'
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const toggleExpand = (index) => {
    setMessages(messages.map((msg, i) => 
      i === index ? { ...msg, expanded: !msg.expanded } : msg
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