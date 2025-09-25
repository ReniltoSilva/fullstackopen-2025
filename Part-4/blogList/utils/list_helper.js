const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  if (blogPosts.length === 1) {
    return blogPosts[0].likes;
  } else if (blogPosts.length === 0) {
    return 0;
  } else
    return blogPosts
      .map((item) => item.likes)
      .reduce((acc, total) => acc + total, 0);
};

const favoriteBlog = (blogList) => {
  const mostLiked = blogList.reduce((acc, item) =>
    acc > item.likes ? acc : item.likes
  );
  const item = blogList.find((item) => item.likes === mostLiked);
  return item;
};

const mostBlogs = (blogList) => {
  const counts = blogList.reduce((acc, { author }) => {
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  // console.log(counts);
  let top = { author: null, blogs: 0 };
  for (const [author, num] of Object.entries(counts)) {
    if (num > top.blogs) {
      top = { author, blogs: num };
    }
  }
  // console.log(top);
  return top;
};

const mostLikes = (blogList) => {
  let blogLikes = blogList.reduce((acc, item) => {
    acc[item.author] = (acc[item.author] || 0) + item.likes;
    return acc;
  }, {});

  let top = { author: null, likes: 0 };
  for (const [author, likes] of Object.entries(blogLikes)) {
    if (likes > top.likes) {
      top = { author, likes };
    }
  }

  return top;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
