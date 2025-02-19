import React from "react";

import { AuthProvider } from "./components/auth/AuthContext"
import ChatInput from "./components/ChatInput"
import Layout from "./components/Layout"

function App() {

  return (
      <AuthProvider>
        <Layout>
          <ChatInput/>
        </Layout>
    </AuthProvider>
  )
}

export default App
