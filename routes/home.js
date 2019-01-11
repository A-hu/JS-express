const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Louis Express', message: 'Hello PUG' });
});

module.exports = router;
