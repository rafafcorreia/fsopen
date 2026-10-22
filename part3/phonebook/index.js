const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

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
app.use(cors());

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
];

const generateId = () => {
  const id = Math.floor(Math.random() * 1_000_000);
  return String(id);
};

app.get('/info', (request, response) => {
  let html = `<p>Phonebook has info for ${persons.length} people</p>`;
  html += `<p>${Date().toString()}</p>`;

  response.status(200).send(html);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return response.status(404).end();
  }
  return response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response
      .status(400)
      .json({ error: 'The name and number are required.' });
  }

  const isSameName = persons.find(
    (p) => p.name.toLowerCase().trim() === name.toLowerCase().trim(),
  );

  if (isSameName) {
    return response
      .status(400)
      .json({ error: `The name "${name}" already exists in the phonebook.` });
  }

  const newPerson = { id: generateId(), name: name, number: number };

  persons.push(newPerson);
  response.json(newPerson);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Starting server on port ${PORT}`);
});
