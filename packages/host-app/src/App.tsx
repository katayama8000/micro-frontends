import React, { Suspense } from 'react';
import './App.css';

const RemoteApp = React.lazy(() => import('remote_app/App'));
function App() {
  return (
    <div style={{ padding: '20px', border: '5px solid blue' }}>
      <h1>this is the host app</h1>

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
