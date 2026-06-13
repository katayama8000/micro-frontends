import { useEffect, useState } from 'react';
import { emit, on } from './eventBus';

function App() {
  const [count, setCount] = useState(0);

  // Broadcast every count change so the host (or any other MFE) can react.
  useEffect(() => {
    emit('remote:count-changed', { count });
  }, [count]);

  // Listen for a reset request coming from the host.
  useEffect(() => {
    const off = on('host:reset-count', ({ reason }) => {
      console.log(`[remote] resetting count, reason: ${reason}`);
      setCount(0);
    });
    return off; // unsubscribe on unmount
  }, []);

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
