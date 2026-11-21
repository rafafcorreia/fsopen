const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('get all blogs', () => {
  test('returns correct amount', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test('returns them with property id', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(blogs.body[0]._id === undefined);
    assert(blogs.body[0].id);
  });
});

describe('create a blog', () => {
  test('with valid request is stored successfully', async () => {
    const newBlog = {
      title: 'Lorem Ipsum',
      author: 'John Doe',
      url: 'https://test-site.info/',
      likes: 99,
    };

    const blogsBefore = await helper.blogsInDb();

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await helper.blogsInDb();
    assert.strictEqual(
      blogsAfter.length,
      blogsBefore.length + 1,
      `expected results length to be increased to ${blogsBefore.length + 1}, but found ${blogsAfter.length}`,
    );

    const savedBlog = blogsAfter.find((b) => b.title === newBlog.title);

    assert(
      savedBlog,
      `new blog title "${newBlog.title}" was not found in results:\n${JSON.stringify(blogsAfter, null, 2)}`,
    );

    assert.partialDeepStrictEqual(savedBlog, newBlog);
  });

  test('without likes stores with 0 likes', async () => {
    const newBlog = {
      title: 'Lorem Ipsum',
      author: 'John Doe',
      url: 'https://test-site.info/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const expectedBlog = { ...newBlog, likes: 0 };

    const blogsAfter = await helper.blogsInDb();
    const savedBlog = blogsAfter.find((b) => b.title === newBlog.title);

    assert.strictEqual(savedBlog.likes, expectedBlog.likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
