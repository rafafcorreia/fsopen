const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (request, response) => {
  const username = request.body.username ? request.body.username.trim() : undefined
  const name = request.body.name ? request.body.name.trim() : undefined
  const password = request.body.password ? request.body.password.trim() : undefined

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'username and password are required' });
  }

  if (username.length < 3) {
    return response.status(400).json({ error: 'username needs to be at least 3 characters long' })
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'password needs to be at least 3 characters long' })
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({ username, name, passwordHash });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

module.exports = usersRouter;
