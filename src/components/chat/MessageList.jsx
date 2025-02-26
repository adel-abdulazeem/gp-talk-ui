import React, { useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import ReactMarkdown from 'react-markdown'
const MessageList = ({ response, displayData, messages,  }) => {

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  const renderMessage = (msg) => {
    return (
      <div 
        key={msg.id} 
        className={`message ${msg.role}-message bg-gray-100 dark:bg-gray-800`}
      >
        <Markdown>{msg.text}</Markdown>
      </div>
    );
  };

  return (
    <div>
        {messages.map(renderMessage)}
      {response.map(renderMessage)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;