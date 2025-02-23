import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages, toggleExpand }) => {
  const messagesEndRef = useRef(null);
  const MAX_TEXT_LENGTH = 150;
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className="messages">
      {messages.map((msg) => {
        let len = msg.text.length? msg.text.length : 100
        let isLongText = len > MAX_TEXT_LENGTH;
        return (
          <div 
            key={msg.id} 
            className={`message ${msg.role}-message bg-gray-100 dark:bg-gray-900`}
          >
            <div className="message-header">
              <span className="message-role">
                {msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}
              </span>
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className={`message-body ${
              isLongText && !msg.expanded ? 'collapsed' : ''
            }`}>
              {msg.text}
            </div>
            {isLongText && (
              <button
                onClick={() => toggleExpand(msg.id)}
                className="toggle-expand"
              >
                {msg.expanded ? '▲ Collapse' : '▼ Expand'}
              </button>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};


export default MessageList;