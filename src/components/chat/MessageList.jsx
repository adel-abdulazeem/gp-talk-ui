import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MessageList = ({ response, messages }) => {
  const messagesEndRef = useRef(null);
  const [expandedMessages, setExpandedMessages] = useState(new Set());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const toggleExpansion = (messageId) => {
    setExpandedMessages(prev => {
      const next = new Set(prev);
      next.has(messageId) ? next.delete(messageId) : next.add(messageId);
      return next;
    });
  };

  const renderMessage = (msg) => {
    const isLongMessage = msg.text.length > 200;
    const isExpanded = expandedMessages.has(msg.id);
    const displayText = isLongMessage && !isExpanded 
      ? `${msg.text.substring(0, 200)}...`
      : msg.text;

    return (
      <div
        key={msg.id}
        className={`message-container ${msg.role}-container p-2 mb-4 rounded-lg`}
      >
        <div
          className={`message-content ${msg.role}-message p-3 rounded-md ${
            msg.role === 'bot'
              ? 'bg-gray-100 dark:bg-gray-700'
              : 'bg-gray-300 dark:bg-gray-900'
          }`}
        >
          <ReactMarkdown>
            {displayText}
          </ReactMarkdown>
          {isLongMessage && (
            <button
              onClick={() => toggleExpansion(msg.id)}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="messages-container space-y-4 p-4">
      {messages.map(renderMessage)}
      {response.map(renderMessage)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;