
import React, { useState, useRef, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { AuthContext } from "./auth/AuthContext";
import MessageList from './chat/MessageList';
import ChatForm from './chat/ChatForm';
import FloatingDataWindow from './chat/FloatingDataWindow';


const ChatInput = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState([]);
  const [displayData, setDisplayData] = useState('');
  const [file, setFile] = useState(null);
  const [fileAttached, setFileAttached] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showWindow, setShowWindow] = useState(true);
  const [streamingResponse, setStreamingResponse] = useState({
    id: '',
    text: '',
    isComplete: false
  });

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textAreaRef = useRef(null);
  const sseDataRef = useRef('');
  const updateTimeoutRef = useRef(null);

  // Scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, response]);


  useEffect(() => {
    setIsActive(message.trim() !== '' || fileAttached);
  }, [message, fileAttached]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileAttached(true);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isActive || isStreaming) return;

    // Create user message
    const userMessage = {
      id: nanoid(),
      text: message,
      role: 'user',
      timestamp: new Date().toISOString(),
      expanded: false
    };

    // Create initial bot message
    const botMessageId = nanoid();
    const initialBotMessage = {
      id: botMessageId,
      text: '',
      role: 'bot',
      timestamp: new Date().toISOString(),
      expanded: false,
      isStreaming: true
    };

    // Reset streaming state
    setStreamingResponse({
      id: botMessageId,
      text: '',
      isComplete: false
    });

    setMessages(prev => [...prev, userMessage]);
    setResponse(prev => [...prev, initialBotMessage]);

    try {
      setIsStreaming(true);
      const controller = new AbortController();
      const url = 'http://localhost:3000/generate';

      await fetchEventSource(url, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({ message }),
        onopen(response) {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        },
        onmessage(event) {
          const newData = JSON.parse(event.data).text;
          setStreamingResponse(prev => ({
            ...prev,
            text: prev.text + newData
          }));

          // Update the response in the messages list
          setResponse(prev => prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: msg.text + newData }
              : msg
          ));
        },
        onclose() {
          setStreamingResponse(prev => ({
            ...prev,
            isComplete: true
          }));
          // Update final message state
          setResponse(prev => prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, isStreaming: false }
              : msg
          ));
        },
        onerror(err) {
          console.error('Error in SSE connection:', err);
          controller.abort();
          throw err;
        },
      });
    } catch (error) {
      console.error('Error:', error);
      setResponse(prev => prev.map(msg => 
        msg.id === streamingResponse.id 
          ? {
              ...msg,
              text: 'Error: Failed to get response',
              isStreaming: false
            }
          : msg
      ));
    } finally {
      setIsStreaming(false);
      setMessage('');
      setFile(null);
      setFileAttached(false);
      if (textAreaRef.current) textAreaRef.current.style.height = '3rem';
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
   const demoData = `graph TD
   A[Client] --> B[Router 1]
   B --> C[Router 2]
   C --> D[Server]`;
console.log(response)
console.log(isStreaming)
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-center mb-10">What can I help with?</h1>
      <MessageList 
      response={response}
      displayData={displayData}  
      messages={messages}  
      />
      <div>
      {showWindow && <button 
        onClick={() => setShowWindow(!showWindow)}
        className="p-2 bg-blue-500 text-white rounded"
        >
          Toggle Preview Window
        </button>
      }
      {showWindow && (
        <FloatingDataWindow 
          data={demoData}
        />
      )}
    </div>
      <ChatForm
        message={message}
        setMessage={setMessage}
        file={file}
        fileAttached={fileAttached}
        isActive={isActive}
        fileInputRef={fileInputRef}
        textAreaRef={textAreaRef}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        handleClearFile={() => {
          setFile(null);
          setFileAttached(false);
          fileInputRef.current.value = '';
        }}
        isStreaming={isStreaming}
      />
    </main>
  );
};
export default ChatInput;

