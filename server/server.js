const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors()); // Enable CORS for all routes and origins
app.use(express.json());

// Basic API endpoint
app.get('/data', (req, res) => {
  res.json({
    status: 'success',
    message: 'Hello from the Express server!',
    timestamp: new Date().toLocaleTimeString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
