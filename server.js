// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const LOG_FILE_PATH = path.join("C:\react3");

app.use(express.static('public'));

app.get('/logs', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  const sendLogUpdate = () => {
    fs.readFile(LOG_FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading log file:', err);
        return;
      }
      res.write(`data: ${data}\n\n`);
    });
  };

  // Initial log send
  sendLogUpdate();

  // Watch for file changes
  fs.watch(LOG_FILE_PATH, (eventType) => {
    if (eventType === 'change') {
      sendLogUpdate();
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
