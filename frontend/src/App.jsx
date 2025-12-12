import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Frontend Boilerplate
        </h1>
        <p className="text-gray-600 mb-6">
          Ready for development!
          <br />
          Edit <code className="bg-gray-200 px-1 rounded">src/App.jsx</code> to get started.
        </p>
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App

