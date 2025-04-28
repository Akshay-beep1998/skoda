import React, { useState } from 'react';

export default function AutoLogParser() {
  const [logs, setLogs] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      const lines = fileContent.split(/\r?\n/);

      const parsedLogs = lines.map((line) => {
        if (line.trim() === '') return null;

        // Extract Date & Time at start
        const dateTimeMatch = line.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
        const dateTime = dateTimeMatch ? dateTimeMatch[0] : 'Unknown';

        // Extract Lane: after <STX> comes 6 digits
        const laneMatch = line.match(/<STX>(\d{6})/);
        const lane = laneMatch ? laneMatch[1] : 'Unknown';

        // Extract VIN: after V001-- and before -
        const vinMatch = line.match(/V001--([^-]*)-/);
        const vin = vinMatch ? vinMatch[1] : 'Unknown';

        return {
          originalLog: line,
          dateTime,
          lane,
          vin,
        };
      }).filter(Boolean);

      setLogs(parsedLogs);
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Auto Log Parser</h1>

      <input
        type="file"
        accept=".txt,.log"
        onChange={handleFileUpload}
        style={{ margin: "20px 0", padding: "10px" }}
      />

      {logs.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Date & Time</th>
              <th style={thStyle}>Lane</th>
              <th style={thStyle}>VIN</th>
              <th style={thStyle}>Original Log</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td style={tdStyle}>{log.dateTime}</td>
                <td style={tdStyle}>{log.lane}</td>
                <td style={tdStyle}>{log.vin}</td>
                <td style={tdStyle}>{log.originalLog}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Simple inline styles
const thStyle = { border: "1px solid #ddd", padding: "8px", backgroundColor: "#f2f2f2" };
const tdStyle = { border: "1px solid #ddd", padding: "8px" };
