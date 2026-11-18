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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const blogsByAuthorMap = new Map();

  blogs.forEach((blog) => {
    blogsByAuthorMap.set(
      blog.author,
      (blogsByAuthorMap.get(blog.author) || 0) + 1,
    );
  });

  const blogsByAuthorList = Array.from(blogsByAuthorMap);
  const mostBlogsAuthor = blogsByAuthorList.reduce((top, current) => {
    return current[1] > top[1] ? current : top;
  });
  return {
    author: mostBlogsAuthor[0],
    blogs: mostBlogsAuthor[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const likesByAuthorMap = new Map();

  blogs.forEach((blog) => {
    likesByAuthorMap.set(
      blog.author,
      (likesByAuthorMap.get(blog.author) || 0) + blog.likes,
    );
  });

  const mostLikedAuthor = Array.from(likesByAuthorMap).reduce(
    (top, current) => {
      return current[1] > top[1] ? current : top;
    },
  );

  return {
    author: mostLikedAuthor[0],
    likes: mostLikedAuthor[1],
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
