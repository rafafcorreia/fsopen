const blogsRouter = require('express').Router();
const blog = require('../models/blog');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.title || !blog.url) {
    return response.status(400).send({ error: 'title and url are required' });
  }

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const currentBlog = await Blog.findById(request.params.id);

  if (!currentBlog) {
    return response.status(404).end();
  }

  currentBlog.title = title;
  currentBlog.author = author;
  currentBlog.url = url;
  currentBlog.likes = likes;

  const updatedBlog = await currentBlog.save();
  response.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);

  if (!deletedBlog) {
    return response.status(404).end();
  }

  response.status(204).end();
});

module.exports = blogsRouter;
