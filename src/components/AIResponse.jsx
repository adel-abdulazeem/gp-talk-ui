import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponseUI = ({ response, responses, toggleExpand, isLoading }) => {
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    const container = document.getElementById('messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [responses]);

  return (
    <div 
      id="messages-container"
      role="log"
      aria-live="polite"
    >

    
  </div>  
  );
};

export default AIResponseUI;

{/* <ReactMarkdown
remarkPlugins={[remarkGfm]}
components={{
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
}}
>
</ReactMarkdown> */}
