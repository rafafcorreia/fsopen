const Blog = require('../models/blog');

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

module.exports = {
  initialBlogs,
  blogsInDb,
  getRandom,
};
