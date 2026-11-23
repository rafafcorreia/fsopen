const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const mongoose = require('mongoose');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({
      username: 'root',
      passwordHash,
    });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersBefore = await helper.usersInDb();

    const newUser = {
      username: 'jdoe',
      name: 'John Doe',
      password: 'secretfoobar',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    assert.strictEqual(usersAfter.length, usersBefore.length + 1);
    const savedUser = usersAfter.find((u) => u.username === newUser.username);
    assert(savedUser);
    assert.strictEqual(savedUser.name, newUser.name);
  });

  test('creation fails with status code 400 and a message if username already taken', async () => {
    const usersBefore = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'secretfoobar',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    assert.strictEqual(usersAfter.length, usersBefore.length);
    assert(response.body.error.includes('expected `username` to be unique'));
  });
});

after(async () => {
  mongoose.connection.close();
});
