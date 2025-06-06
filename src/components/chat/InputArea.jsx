import React, { forwardRef } from 'react';

const InputArea = forwardRef(({ value, onChange }, ref) => {
  const handleChange = (e) => {
    onChange(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="inputContair">
    <textarea
      ref={ref}
      value={value}
      onChange={handleChange}
      placeholder="Type a message..."
      className="textInput dark:bg-gray-800"
      rows={1}
    />
    </div>
  );
});

export default InputArea;