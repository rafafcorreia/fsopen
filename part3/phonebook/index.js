require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();

const tinyData = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    JSON.stringify(req.body),
  ].join(' ');
};

app.use(express.json());
app.use(morgan(tinyData));
app.use(express.static('dist'));

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
];

app.get('/info', (request, response) => {
  let html = `<p>Phonebook has info for ${persons.length} people</p>`;
  html += `<p>${Date().toString()}</p>`;

  response.status(200).send(html);
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => response.json(persons));
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return response.status(404).end();
  }
  return response.json(person);
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response
      .status(400)
      .json({ error: 'The name and number are required.' });
  }

  Person.findOne({ name }).then((document) => {
    if (document) {
      return response
        .status(400)
        .json({ error: `The name "${name}" already exists in the phonebook.` });
    }

    const person = new Person({
      name,
      number,
    });

    person.save().then((newPerson) => response.json(newPerson));
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
