import React ,{useState} from "react";

import { AuthProvider } from "./components/auth/AuthContext"
import ChatInput from "./components/ChatInput"
import Layout from "./components/Layout"
import FloatingDataWindow from './components/chat/FloatingDataWindow'
function App() {
  const [showWindow, setShowWindow] = useState(false);
  const demoData = `graph TD
    A[Client] --> B[Router 1]
    B --> C[Router 2]
    C --> D[Server]`;
  return (
      <AuthProvider>
        <Layout>
          <ChatInput/>
          <div>
      <button 
        onClick={() => setShowWindow(!showWindow)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Toggle Preview Window
      </button>

      {showWindow && (
        <FloatingDataWindow 
          data={demoData}
          format="mermaid"
        />
      )}
    </div>
        </Layout>
    </AuthProvider>
  )
}

export default App
