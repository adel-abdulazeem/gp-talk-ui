
import React, { useState, useRef, useEffect, useContext } from 'react';
import { nanoid } from 'nanoid';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { AuthContext } from "./auth/AuthContext";
import MessageList from './chat/MessageList';
import ChatForm from './chat/ChatForm';


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

  useEffect(() => {
    if (response.length === 0) return;
    const lastMessage = response[response.length - 1];
    if (lastMessage.role === 'bot' && lastMessage.isStreaming) {
      setResponse(prev => {
        const newResponse = [...prev];
        const lastIndex = newResponse.length - 1;
        newResponse[lastIndex] = {
          ...newResponse[lastIndex],
          text: displayData
        };
        return newResponse;
      });
    }
  }, [displayData, response.length]);
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
    const userMessage = {
      id: nanoid(),
      text: message,
      role: 'user',
      timestamp: new Date().toISOString(),
      expanded: false
    };
    // Create temporary bot message
    const tempBotId = nanoid();
    const botMessage = {
      id: tempBotId,
      text: displayData,
      role: 'bot',
      timestamp: new Date().toISOString(),
      expanded: false,
      isStreaming: true
    };

    setMessages(prev => [...prev, userMessage]);
    setResponse(prev => [...prev, botMessage ]); 

    try {
      setIsStreaming(true);
      const controller = new AbortController();
      const url = 'http://localhost:3000/generate'
       fetchEventSource(url, {
        signal: controller.signal,
        method: 'POST',
        headers: {
          Accept: 'text/event-stream',
        },
        body: JSON.stringify({
          message: message,
          userId: user?.id
        }),
        onopen(response) {
          if (response.ok && response.status === 200) {
            console.log(response);
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            console.error('Client error, closing connection.');
            controller.abort();
          }
        },
        onmessage(event) {
          sseDataRef.current += JSON.parse(event.data).text;
      // Throttle updates: only update state every 100ms
      if (!updateTimeoutRef.current) {
        updateTimeoutRef.current = setTimeout(() => {
          setDisplayData(sseDataRef.current);
          updateTimeoutRef.current = null;
        }, 100);
      }
        // setResponse(prev => [...prev, JSON.parse(event.data).text])
        // console.log('New message:', JSON.parse(event.data));
        // console.log('New message:', event.data);
        },
        onclose() {
          console.log('SSE connection closed by server.');
  
        },
        
        onerror(err) {
          console.error('Error in SSE connection:', err);
        },
      });
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => {
        // Find and update the temporary bot message if it exists
        const updatedMessages = prev.map(msg => 
          msg.id === tempBotId ? 
          { ...msg, text: 'Error: Failed to get response', isStreaming: false } : 
          msg
        );
        
        // If we couldn't find the temporary bot message, add an error message
        if (!updatedMessages.find(msg => msg.id === tempBotId)) {
          updatedMessages.push({
            id: nanoid(),
            text: `Error: ${error.message}`,
            role: 'error',
            timestamp: new Date().toISOString(),
            expanded: false
          });
        }
        
        return updatedMessages;
      });
    } finally {
      setIsStreaming(false);
      setMessage('');
      setFile(null);
      setFileAttached(false);
      if (textAreaRef.current) textAreaRef.current.style.height = '3rem';
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (sseDataRef.current) sseDataRef.current= ''
      if (updateTimeoutRef.current) updateTimeoutRef.current.value = null
    }
    };
    console.log(messages)
    
    const toggleExpand = (id) => {
      setMessages(messages.map((msg) => 
        msg.id === id ? { ...msg, expanded: !msg.expanded } : msg
      ));
   };
   
   // Example Mermaid diagram data
const mermaidDiagram = `
graph TD
    A[Router 1] -->|MPLS LSP| B(Label Edge Router)
    B --> C[Router 2]
    C --> D[Router 3]
    D --> E[Router 4]
`;
  
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold text-center mb-10">What can I help with?</h1>
      <MessageList displayData={displayData}  response={response} messages={messages} toggleExpand={toggleExpand} />
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

