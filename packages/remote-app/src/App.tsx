import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderRadius: '8px',
        textAlign: 'center',
      }}>
      <h3>🟢 Remote Application (Port 5001)</h3>
      <p>This entire area is bundled and deployed completely independently.</p>

      <div style={{ margin: '15px 0' }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
          Remote Counter: {count}
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#888' }}>
        Powered by React 19 / Vite / Module Federation
      </p>
    </div>
  );
}

export default App;
