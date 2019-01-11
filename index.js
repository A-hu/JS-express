const Joi = require('joi');
const logger  = require('./logger');
const authentication = require('./authentication');
const express = require('express');
const app = express();

app.use(express.json()); // req.body

app.use(logger);
app.use(authentication);

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
  res.send('Hello Express');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // result.error

  if(error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing ,return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body); // result.error

  if(error) return res.status(400).send(error.details[0].message);

  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing ,return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found.');

  // Delete course
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // Return the updated course
  res.send(course);
});

// PORT: export PORT=xxxx in terminal
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);
}
