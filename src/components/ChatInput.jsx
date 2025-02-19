import React, { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      textareaRef.current.focus();

    }
  }, [message]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents newline on Enter
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        rows={1}
        className="chat-input"
      />
      <button 
      onClick={handleSend} 
      disabled={!message.trim()}
      className="send-button"
      aria-label="Send message"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;