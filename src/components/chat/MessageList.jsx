import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'
const MessageList = ({ response, messages,  }) => {

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  const renderMessage = (msg) => {
    return (
      <div 
        key={msg.id} 
        className={`message ${msg.role}-message 
        ${msg.role === 'bot'?
           'bg-gray-100 dark:bg-gray-700' :
            'bg-gray-100 dark:bg-gray-900'}`}
        >
        <ReactMarkdown>{msg.text}</ReactMarkdown> 
      </div>
    );
  };

  return (
    <div className='messages-container'>
        {messages.map(renderMessage)}
        {response.map(renderMessage)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;