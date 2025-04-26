import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const MessageList = ({ response, messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, response]); // Include response in dependencies

  const renderMessage = (msg) => {
    return (
      <div 
        key={msg.id} 
        className={`message ${msg.role}-message 
          ${msg.role === 'bot' 
            ? 'bg-gray-100 dark:bg-gray-700' 
            : 'bg-gray-100 dark:bg-gray-900'}`}
      >
        <ReactMarkdown>{msg.text}</ReactMarkdown>
      </div>
    );
  };
const renderRes = (msg) => {
  return (
    <div 
      key={msg.id} 
      className={`message ${msg.role}-message 
        ${msg.role === 'bot' 
          ? 'bg-gray-100 dark:bg-gray-700' 
          : 'bg-gray-100 dark:bg-gray-900'}`}
    >
      <ReactMarkdown>{msg.text}</ReactMarkdown>
    </div>
  );
};


const prompt = messages.map((msg, index) => (
  // Container for each user message and its bot response
  <div key={msg.id}>
    {renderMessage(msg)}
    {/* Render corresponding bot response */}
    <ReactMarkdown>{`${response[index].text}`}</ReactMarkdown>
  </div>
))
  return (
    <div className='message-list'>
      <div className='messages-container'>
        {prompt}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;