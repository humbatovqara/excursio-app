import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <button>Hello World</button>
    </div>
  )
}

export default App
