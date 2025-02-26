import React, { useRef, useEffect } from 'react';

const MessageList = ({displayData, messages, toggleExpand }) => {

  const messagesEndRef = useRef(null);
  const MAX_TEXT_LENGTH = 150;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  const renderMessage = (msg) => {
    const len = msg.text?.length || 0;
    const isLongText = len > MAX_TEXT_LENGTH;
    return (
      <div 
        key={msg.id} 
        className={`message ${msg.role}-message bg-gray-100 dark:bg-gray-900`}
      >

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
        {messages.map(renderMessage)}

      </div>
      {/* Bot Messages Column */}
      <div className="bot-messages">
        {/* Current Response */}
        { true&& (
          <div className="message assistant-message bg-gray-100 dark:bg-gray-900">
            <div className="message-body">
          {/* {response.map(res => res.text)} */}
              {...displayData}
            </div>
          </div>
        )}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;