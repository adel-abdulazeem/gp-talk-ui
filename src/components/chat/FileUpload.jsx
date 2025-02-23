import React, { forwardRef } from 'react';
import { IoCloseCircleSharp } from 'react-icons/io5';

const FileUpload = forwardRef(({ file, fileAttached, onChange, onClear }, ref) => {
  return (
    <div>
      <input
        type="file"
        ref={ref}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      {fileAttached && (
        <div className="fileName bg-gray-200 dark:bg-gray-800">
          {file.name}
          <button 
          className="clearFile"
          type="button" 
          onClick={onClear}>
            <IoCloseCircleSharp size={24} />
          </button>
        </div>
      )}
    </div>
  );
});

export default React.memo(FileUpload);