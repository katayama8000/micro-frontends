import { Suspense, lazy, useEffect, useState } from 'react';
import { emit, on } from './eventBus';

const RemoteApp = lazy(() => import('remote_app/App'));

function App() {
  // The host holds no direct reference to the remote's state. It only learns
  // about the remote counter by listening for the `remote:count-changed` event.
  const [remoteCount, setRemoteCount] = useState<number | null>(null);

  useEffect(() => {
    const off = on('remote:count-changed', ({ count }) => setRemoteCount(count));
    return off; // unsubscribe on unmount
  }, []);

  return (
    <div style={{ padding: '20px', border: '5px solid blue' }}>
      <h1>this is the host app</h1>

      <div style={{ marginTop: '15px' }}>
        <strong>Host knows the remote counter is:</strong>{' '}
        {remoteCount === null ? '(no event received yet)' : remoteCount}
        <button
          onClick={() => emit('host:reset-count', { reason: 'host button clicked' })}
          style={{ marginLeft: '15px' }}>
          Reset remote counter (emit event)
        </button>
      </div>

      <div
        style={{
          marginTop: '25px',
          padding: '20px',
          border: '5px solid green',
        }}>
        <h2>this is the remote app loaded in the host app</h2>
        <Suspense fallback={<div>loading remote app...</div>}>
          <RemoteApp />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
