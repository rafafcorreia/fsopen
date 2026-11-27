const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const initialBlogs = [
  {
    title:
      'Adamo tabernus vulticulus civis perspiciatis triumphus maxime voluptates.',
    author: 'Weston Borer',
    url: 'https://windy-meadow.name',
    likes: 42,
  },
  {
    title: 'Adfero conscendo vobis.',
    author: 'Weldon Weissnat',
    url: 'https://delirious-fishery.info/',
    likes: 506,
  },
];

const blogsInDb = async (populate = true) => {
  let blogs;

  if (populate) {
    blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  } else {
    blogs = await Blog.find({});
  }

  return blogs.map((b) => b.toJSON());
};

const getRandom = (list) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

const createUsers = async (users, saltRounds = 10) => {
  for (const u of users) {
    const newUser = structuredClone(u);
    newUser.passwordHash = await bcrypt.hash(newUser.password, saltRounds);
    delete newUser.password;
    const user = new User(newUser);
    await user.save();
  }
};

const usersInDb = async (populate = true) => {
  let users;
  if (populate) {
    users = await User.find({}).populate('blogs', { url: 1, title:1, author: 1, id: 1 })
  } else {
    users = await User.find({})
  }
  return users.map((u) => u.toJSON());
};

const createBlogs = async (blogs) => {
  for (const b of blogs) {
    const newBlog = structuredClone(b)
    const user = await User.findOne({ username: newBlog.username })
    newBlog.user = user.id
    delete newBlog.username
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
  }
}

module.exports = {
  initialBlogs,
  blogsInDb,
  getRandom,
  createUsers,
  usersInDb,
  createBlogs
};
