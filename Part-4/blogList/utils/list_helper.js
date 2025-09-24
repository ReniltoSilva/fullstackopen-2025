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

module.exports = { dummy, totalLikes };
