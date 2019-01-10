const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2,3 ]);
});

// PORT: export PORT=xxxx in terminal
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });
