
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
    
    // Create temporary bot message
    const tempBotId = nanoid();
    const botMessage = {
      id: tempBotId,
      text: '',
      role: 'bot',
      timestamp: new Date().toISOString(),
      expanded: false,
      isStreaming: true
    };

    setMessages(prev => [...prev, userMessage, botMessage]);

    try {
      setIsStreaming(true);
      let accumulatedText = '';

      await fetchEventSource('http://localhost:3000/generate', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          userId: user?.id
        }),
        onopen: async (response) => {
          console.log('Stream connection opened:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          });
          
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
        },
        onmessage: (event) => {
          try {
            console.log('Received event:', {
              type: event.event,
              data: event.data
            });

            // Handle different event types
            switch (event.data) {
              case 'chunk':
                const parsedData = event.data;
                if (parsedData.chunk) {
                  accumulatedText += parsedData.chunk;
                  setMessages(prev => prev.map(msg => 
                    msg.id === tempBotId ? { 
                      ...msg, 
                      text: accumulatedText 
                    } : msg
                  ));
                }
                break;
                
              case 'end':
                console.log('Stream completed');
                setMessages(prev => prev.map(msg => 
                  msg.id === tempBotId ? { ...msg, isStreaming: false } : msg
                ));
                break;
                
              case 'error':
                const errorData = JSON.parse(event.data);
                throw new Error(errorData.error || 'Stream error');
                
              default:
                console.log(`Unhandled event type: ${event.event}`);
            }
          } catch (err) {
            console.error('Error processing event:', err);
          }
        },
        onerror: (err) => {
          console.error('Stream error:', err);
          throw err;
        },
        onclose: () => {
          console.log('Stream connection closed');
          setIsStreaming(false);
        }
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
    }
  };