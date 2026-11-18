// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite;
  };

  return blogs.length > 0 ? blogs.reduce(reducer) : {};
};

module.exports = { dummy, totalLikes, favoriteBlog };
