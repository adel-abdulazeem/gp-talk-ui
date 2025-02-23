import React from 'react';
import { Brain } from 'lucide-react';

import InputArea from './InputArea';
import FileUpload from './FileUpload';
import { CircleArrowUp, Plus } from 'lucide-react';

const ChatForm = ({
  message,
  setMessage,
  file,
  fileAttached,
  isActive,
  fileInputRef,
  textAreaRef,
  handleFileChange,
  handleSubmit,
  handleClearFile
}) => {
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <InputArea ref={textAreaRef} value={message} onChange={setMessage} />
          <FileUpload
            ref={fileInputRef}
            file={file}
            fileAttached={fileAttached}
            onChange={handleFileChange}
            onClear={handleClearFile}
          />
        </div>
        <div className="buttonGroup">
          <div className="btn-opt">
            <button 
            className="fileButton"
            type="button" 
            onClick={() => fileInputRef.current?.click()}>
              <Plus size={32} />
            </button>
            <button 
            className="searchButton"
            type="button" 
            onClick={() => alert('Web search')}>
              Web
            </button>
            <button 
            className='reasonButton'
            type="button" 
            onClick={() => alert('Reason')}>
              Reason
            </button>
          </div>
          <button type="submit" 
            className={isActive ? 'activeButton' : 'inactiveButton'}
          disabled={!isActive}>
            <CircleArrowUp size={48} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;