import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">🚀 Löneportalen v2.0</h1>
        <p className="text-gray-600 mb-8">Modern React + TypeScript Migration</p>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Test Counter: {count}
        </button>
        <div className="mt-8 text-sm text-gray-500">
          <p>✅ Vite + React + TypeScript</p>
          <p>✅ Tailwind CSS configured</p>
          <p>✅ Ready for migration!</p>
        </div>
      </div>
    </div>
  )
}

export default App
