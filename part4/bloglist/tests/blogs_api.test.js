const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user')

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
})

describe('when there are blogs already', () => {
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
  });

  test('get all blogs succeeds with status code 200', async (t) => {
    const blogsBefore = await helper.blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    t.test('and returns correct amount', async () => {
      assert.strictEqual(response.body.length, t.initialBlogs.length);
    });

    t.test('and returns correct content', async () => {
      assert.deepStrictEqual(response.body, blogsBefore);
    });
  })

  test('create a blog with valid request', async (t) => {
    const newBlog = {
      title: 'A valid blog',
      author: 'John Doe',
      url: 'https://test-site.info/',
      likes: 99,
    };

    const blogsBefore = await helper.blogsInDb();
    const usersBefore = await helper.usersInDb()

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await helper.blogsInDb();
    const savedBlog = blogsAfter.find((b) => b.title === newBlog.title);

    t.test('increases blogs length by 1', () => {
      assert.strictEqual(
        blogsAfter.length,
        blogsBefore.length + 1
      );
    })

    t.test('is stored successfully', () => {
      assert.partialDeepStrictEqual(savedBlog, newBlog);
    });

    t.test('references the first user', () => {
      const { username, name, id } = usersBefore[0]
      const expectedUser = { username, name, id }
      assert.deepStrictEqual(savedBlog.user, expectedUser)
    })

    t.test('returns the new blog correctly', () => {
      assert.partialDeepStrictEqual(response.body, newBlog)
    })

    t.test('returns new blog with reference to first user id', () => {
      const {id} = usersBefore[0]
      assert.strictEqual(response.body.user, id)
    })
  });

  test('create blog without likes', async (t) => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'John Doe',
      url: 'https://test-site.info/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await helper.blogsInDb();

    t.test('stores with 0 likes', async () => {
      const expectedBlog = { ...newBlog, likes: 0 };
      const savedBlog = blogsAfter.find((b) => b.title === newBlog.title);
      assert.strictEqual(savedBlog.likes, expectedBlog.likes);
    })
  })

  test('create blog without title fails with 400 status code', async (t) => {
    const blogsBefore = await helper.blogsInDb()

    const newBlog = {
      author: 'Without title',
      url: 'https://test-site.info/',
      likes: 99,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAfter = await helper.blogsInDb();

    t.test('without storing it', async () => {
      assert.deepStrictEqual(blogsAfter, blogsBefore);
    })
  });

  test('without url fails with 400 status code', async (t) => {
    const blogsBefore = await helper.blogsInDb()

    const newBlog = {
      title: 'Without url',
      author: 'John Doe',
      likes: 99,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAfter = await helper.blogsInDb();

    t.test('without storing it', async () => {
      assert.deepStrictEqual(blogsAfter, blogsBefore);
    })
  });
  test('update a blog with valid id and data succeeds with status code 200', async (t) => {
    const blogsBefore = await helper.blogsInDb(false);
    const randomBlog = helper.getRandom(blogsBefore);
    const changedBlog = { ...randomBlog, likes: randomBlog.likes + 1 };
    const response = await api
      .put(`/api/blogs/${randomBlog.id}`)
      .send(changedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await helper.blogsInDb(false);

    t.test('and it returns the updated blog', async () => {
      assert.deepStrictEqual(response.body, changedBlog);
    })

    t.test('and the change is persisted', async () => {
      const updatedBlog = blogsAfter.find((b) => b.id === changedBlog.id);
      assert.deepStrictEqual(updatedBlog, changedBlog);
    });
  });


  test('delete a blog with valid id succeeds with status code 204', async (t) => {
    const blogsBefore = await helper.blogsInDb();
    const randomBlog = helper.getRandom(blogsBefore);

    await api.delete(`/api/blogs/${randomBlog.id}`).expect(204);
    const blogsAfter = await helper.blogsInDb();

    t.test('and the blog length is decreased by 1 in db', async () => {
      assert.strictEqual(blogsAfter.length, blogsBefore.length - 1);
    });

    t.test('and its not stored anymore', async () => {
      const removedBlog = blogsAfter.some((b) => b.id === randomBlog.id);
      assert.strictEqual(removedBlog, false);
    })
  });
});


after(async () => {
  await mongoose.connection.close();
});
