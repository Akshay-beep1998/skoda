// LogViewer.js
import React, { useEffect, useState } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/logs');

    eventSource.onmessage = (e) => {
      const rawData = e.data;
      const parsedData = parseCSV(rawData);
      const processedData = processLogData(parsedData);
      setLogs(processedData);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const parseCSV = (data) => {
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index].trim();
        return obj;
      }, {});
    });
  };

  const processLogData = (data) => {
    return data.map(entry => {
      if (entry.bdto === entry.bdta) {
        return { ...entry, destination: 'Updated Destination' }; // Modify as needed
      }
      return entry;
    });
  };

  return (
    <div>
      <h2>Real-Time Log Viewer</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            {logs[0] && Object.keys(logs[0]).map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              {Object.values(log).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogViewer;
