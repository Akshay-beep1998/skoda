import React, { useEffect, useState } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    // Establish a connection to the /logs endpoint for real-time log updates
    const eventSource = new EventSource('/logs');

    eventSource.onmessage = (e) => {
      setLogs(e.data); // Update logs state with new data
    };

    // Clean up when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Log Viewer</h2>
      <pre>{logs}</pre> {/* Display logs */}
    </div>
  );
};

export default LogViewer;
