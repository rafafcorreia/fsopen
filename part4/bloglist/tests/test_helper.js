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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  getRandom,
  createUsers,
  usersInDb,
};
