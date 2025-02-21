import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages, toggleExpand }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="messages">
      {messages.map((msg) => (
        <div key={msg.id} className="message">
          <div className={`message-content ${!msg.expanded ? 'collapsed' : ''}`}>
            {msg.text}
          </div>
          {!msg.expanded && (
            <button onClick={() => toggleExpand(index)} className="see-more-btn">
              See more
            </button>
          )}
          {msg.file && <div className="fileInfo">Attached: {msg.file}</div>}
          <div className="timestamp">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;