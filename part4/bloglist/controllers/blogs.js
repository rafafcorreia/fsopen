const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { title, url, author, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'title and url are required' });
  }

  const users = await User.find({})

  if (users.length < 1) {
    return response.status(400).json({ error: 'no user found to associate with the blog' })
  }

  const firstUser = users[0]

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: firstUser.id
  });

  const savedBlog = await blog.save();
  firstUser.blogs = firstUser.blogs.concat(savedBlog.id);
  await firstUser.save()
  response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const currentBlog = await Blog.findById(request.params.id);

  if (!currentBlog) {
    return response.status(404).end();
  }

  currentBlog.title = title ?? currentBlog.title;
  currentBlog.author = author ?? currentBlog.author;
  currentBlog.url = url ?? currentBlog.url;
  currentBlog.likes = likes ?? currentBlog.likes;

  const updatedBlog = await currentBlog.save();
  response.status(200).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);

  if (!deletedBlog) {
    return response.status(404).end();
  }

  const user = await User.findById(deletedBlog.user)
  user.blogs = user.blogs.filter(b => b.toString() !== deletedBlog.id)
  await user.save()

  response.status(204).end();
});

module.exports = blogsRouter;
