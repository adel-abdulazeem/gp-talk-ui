import React, { useRef, useEffect } from 'react';

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
        className={`message ${msg.role}-message bg-gray-100 dark:bg-gray-900`}
      >
        <div className={`message-body`}>
          {msg.text}
        </div>
        {  (
          <button
            className="toggle-expand"
          >
          </button>
        )}
      </div>
    );
  };
  console.log(displayData)

  return (
    <div className="messages-container">
      <div className="user-messages">
        {messages.map(renderMessage)}

      </div>
      {/* Bot Messages Column */}
      <div className="bot-messages">
        { true&& (
          <div className="message assistant-message bg-gray-100 dark:bg-gray-900">
            <div className="message-body">
          {/* {response.slice(0, 1).map(renderMessage)} */}
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