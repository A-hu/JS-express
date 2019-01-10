const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2,3 ]);
});

app.get('/api/posts/:year/:month', (req, res) => {
  // res.send(req.params); // /api/posts/2019/1, output: { year: "2019", month: "1" }
  res.send(req.query); // /api/posts/2019/1?sortBy=name, output: { sortBy: "name" }
});

// PORT: export PORT=xxxx in terminal
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });
