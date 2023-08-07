const express = require('express');
const app = express();
const PORT = 3000;

// Custom middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('Web application is only available during working hours.');
  }
};

// Apply the middleware for all routes
app.use(workingHoursMiddleware);

// Serve static files from the public folder
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/Home.html'); // Replace with your actual file path
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/Services.html'); // Replace with your actual file path
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/Contact.html'); // Replace with your actual file path
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
