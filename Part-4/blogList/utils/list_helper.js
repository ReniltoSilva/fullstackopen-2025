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

module.exports = { dummy, totalLikes, favoriteBlog };
