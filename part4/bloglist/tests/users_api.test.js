const { test, beforeEach, after, describe } = require('node:test');
const assert = require('node:assert');
const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const Blog = require('../models/blog')

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

after(async () => {
  await mongoose.connection.close();
});

describe('given there is no users', () => {
  test('get all users returns an empty list', async () => {
    const users = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.deepStrictEqual(users.body, []);
  });
});

describe('given there are users with blogs', () => {
  beforeEach(async (t) => {
    t.initialUsers = [
      {
        username: 'root',
        name: 'admin',
        password: 'Supersecret123#',
      },
      {
        username: 'foo',
        name: 'User Foo',
        password: 'Supersecret234#',
      },
    ];

    t.initialBlogs = [
      {
        title: 'Lorem Ipsum',
        author: 'John Doe',
        url: 'https://test-site.info/',
        likes: 42,
        username: 'root'
      },
      {
        title: 'Ipsum Lorem',
        author: 'Doe John',
        url: 'https://learn-cs.test/',
        likes: 199,
        username: 'root'
      }
    ];

    await helper.createUsers(t.initialUsers);
    await helper.createBlogs(t.initialBlogs);
  })

  test('get all users', async (t) => {
    const expectedUsers = await helper.usersInDb()

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const users = response.body;

    await t.test('returns correct length', () => {
      assert.strictEqual(users.length, expectedUsers.length);
    });

    await t.test('returns correct content', () => {
      assert.partialDeepStrictEqual(users, expectedUsers);
    });

    await t.test('returns only expected properties', () => {
      const expectedKeys = expectedUsers.map(() => ['blogs', 'id', 'name', 'username']);
      const actualKeys = users.map((u) => Object.keys(u).sort());
      assert.deepStrictEqual(actualKeys, expectedKeys);
    });
  });

  test('create user with 3 characters long username and password', async (t) => {
    const usersBefore = await helper.usersInDb();

    const user = {
      username: 'bar',
      name: 'John Doe',
      password: '123',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const returnedUser = response.body;
    const usersAfter = await helper.usersInDb();

    await t.test('returns the correct content', () => {
      const { username, name } = user;
      const expectedUser = { username, name, blogs: [] };
      assert.partialDeepStrictEqual(returnedUser, expectedUser);
    });

    await t.test('returns only expected properties', () => {
      const expectedKeys = ['blogs', 'id', 'name', 'username'];
      const actualKeys = Object.keys(returnedUser).sort();
      assert.deepStrictEqual(actualKeys, expectedKeys);
    });

    await t.test('is persisted correctly', () => {
      const savedUser = usersAfter.find((u) => u.username === user.username);
      const { username, name } = user;
      const expectedUser = { username, name, blogs: [] };
      assert.partialDeepStrictEqual(savedUser, expectedUser);
    });

    await t.test('increases the users list length by 1', () => {
      assert.strictEqual(usersAfter.length, usersBefore.length + 1);
    });
  });

  test('create user with 2 characters long username fails with status code 400', async (t) => {

    const usersBefore = await helper.usersInDb();

    const user = {
      username: 'ba',
      name: 'John Doe',
      password: '123',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    const responseBody = response.body;

    await t.test('returning only the expected error', () => {
      assert.deepStrictEqual(responseBody, {
        error: 'username needs to be at least 3 characters long',
      });
    });
    await t.test('without changing users records', () => {
      assert.deepStrictEqual(usersAfter, usersBefore);
    });
  });

  test('create user with 2 characters long password fails with status code 400', async (t) => {
    const usersBefore = await helper.usersInDb();

    const user = {
      username: 'bar',
      name: 'John Doe',
      password: '12',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    const responseBody = response.body;

    await t.test('returning only the expected error', () => {
      assert.deepStrictEqual(responseBody, {
        error: 'password needs to be at least 3 characters long',
      });
    });
    await t.test('without changing users records', () => {
      assert.deepStrictEqual(usersAfter, usersBefore);
    });
  });

  test('create user with an existing username fails with status code 400', async (t) => {
    const usersBefore = await helper.usersInDb();

    const user = {
      username: 'foo',
      name: 'John Doe',
      password: '123',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    const responseBody = response.body;

    await t.test('returning only the expected error', () => {
      assert.deepStrictEqual(responseBody, {
        error: 'username is already in use',
      });
    });
    await t.test(
      'without replacing the user that already had that username',
      () => {
        assert.deepStrictEqual(usersAfter, usersBefore);
      },
    );
    await t.test('without changing the users list length', () => {
      assert.strictEqual(usersAfter.length, usersBefore.length);
    });
  });

  test('create user without username fails with status code 400', async (t) => {

    const usersBefore = await helper.usersInDb();

    const user = {
      name: 'John Doe',
      password: '123',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    const responseBody = response.body;

    await t.test('returning only the expected error', () => {
      assert.deepStrictEqual(responseBody, {
        error: 'username and password are required',
      });
    });

    await t.test('without changing users records', () => {
      assert.deepStrictEqual(usersAfter, usersBefore);
    });
  });

  test('create user without password fails with status code 400', async (t) => {
    const usersBefore = await helper.usersInDb();

    const user = {
      username: 'bar',
      name: 'John Doe',
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await helper.usersInDb();
    const responseBody = response.body;

    await t.test('returning only the expected error', () => {
      assert.deepStrictEqual(responseBody, {
        error: 'username and password are required',
      });
    });

    await t.test('without changing users records', () => {
      assert.deepStrictEqual(usersAfter, usersBefore);
    });
  });

  test('create user without name', async (t) => {
    const usersBefore = await helper.usersInDb();

    const user = {
      username: 'bar',
      password: '123'
    };

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const returnedUser = response.body;
    const usersAfter = await helper.usersInDb();

    await t.test('returns the new user\'s username', () => {
      const { username } = user;
      const expectedUser = { username };
      assert.partialDeepStrictEqual(returnedUser, expectedUser);
    });

    await t.test('returns only expected properties', () => {
      const expectedKeys = ['blogs', 'id', 'username'];
      const actualKeys = Object.keys(returnedUser).sort();
      assert.deepStrictEqual(actualKeys, expectedKeys);
    });

    await t.test('is persisted correctly', () => {
      const savedUser = usersAfter.find((u) => u.username === user.username);
      const expectedUser = { username: user.username };
      assert.partialDeepStrictEqual(savedUser, expectedUser);
    });

    await t.test('increases the users list length by 1', () => {
      assert.strictEqual(usersAfter.length, usersBefore.length + 1);
    });
  });
});
