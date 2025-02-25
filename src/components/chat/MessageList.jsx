import React, { useRef, useEffect } from 'react';

const MessageList = ({ response, messages, toggleExpand }) => {
  const messagesEndRef = useRef(null);
  const MAX_TEXT_LENGTH = 150;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Separate messages by role
  const userMessages = messages.filter(msg => msg.role === 'user');
  const botMessages = messages.filter(msg => msg.role === 'assistant');

  const renderMessage = (msg) => {
    const len = msg.text?.length || 0;
    const isLongText = len > MAX_TEXT_LENGTH;

    return (
      <div 
        key={msg.id} 
        className={`message ${msg.role}-message bg-gray-100 dark:bg-gray-900`}
      >
        <div className="message-header">
          <span className="message-role">
            {msg.role.charAt(0).toUpperCase() + msg.role.slice(1)}:
          </span>
          <span className="message-time">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <div className={`message-body ${isLongText && !msg.expanded ? 'collapsed' : ''}`}>
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
  };

  return (
    <div className="messages-container">
      <div className="user-messages">
        {userMessages.map(renderMessage)}
      </div>

      {/* Bot Messages Column */}
      <div className="bot-messages">
        {botMessages.map(renderMessage)}
        {/* Current Response */}
        { false && (
          <div className="message assistant-message bg-gray-100 dark:bg-gray-900">
            <div className="message-header">
              <span className="message-role">Assistant:</span>
              <span className="message-time">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="message-body">
              {/* {response} */}
            </div>
          </div>
        )}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;