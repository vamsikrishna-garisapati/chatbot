import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ChatResponse from './components/ChatResponse'
import { fetchChatResponse } from './services/api';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      console.error(error);
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='App'>
      <header className='bg-primary text-white text-center py-4'>
        <h1>VK ChatBot</h1>
      </header>
      <ChatInput onSubmit={handleQuestionSubmit} />
      {loading && <div className='loader'>'</div>}
      {!loading && response && <ChatResponse response={response} />}
    </div>
  )
}

export default App;