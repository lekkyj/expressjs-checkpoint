const express = require('express');
const path = require('path');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static CSS
app.use(express.static(path.join(__dirname, 'public')));

// Custom time-check middleware
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow access
  } else {
    res.send('<h1>Sorry, our website is only available during working hours (Mon-Fri, 9 to 17)</h1>');
  }
});

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/services', (req, res) => res.render('services'));
app.get('/contact', (req, res) => res.render('contact'));

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
