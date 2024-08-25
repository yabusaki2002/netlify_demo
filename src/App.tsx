import React, { useState } from 'react';

const ApiResponseViewer: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycby7i3cfyMiBTsPQaJDbFuNuFkXoXtJUql-6Bo6P_p-5VIY-EN1kfrpZycLAY42x4ND8/exec');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>API Response Viewer</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      {error && <p>Error: {error}</p>}
      {response && (
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          {response}
        </pre>
      )}
    </div>
  );
};

export default ApiResponseViewer;