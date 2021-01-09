// set up express
const express = require('express');
const app = express();

// set the routes and port
app.use('/api', require('./api'));
app.use(express.static('static/build', { extensions: ['html'] }));
const port = process.env.PORT || 8080;

// start the server
app.listen(port, (err) => {
  if (err) console.log('error', err);
  else console.log(`app listening on port ${port}`);
});