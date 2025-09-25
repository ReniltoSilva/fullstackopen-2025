const { test, describe, it } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("describe list", () => {
  test("Return 1", (blogs) => {
    assert.strictEqual(listHelper.dummy(blogs), 1);
  });
});

test("Dummy returns 1", () => {
  const blogs = [];
  assert.strictEqual(listHelper.dummy(blogs), 1);
});

describe("total likes", () => {
  test("Sum of all likes", () => {
    const totalLikes = blogs
      .map((item) => item.likes)
      .reduce((acc, total) => acc + total, 0);
    assert.strictEqual(listHelper.totalLikes(blogs), totalLikes);
  });

  test("of empty list is zero", () => {
    const blog = [];
    assert.strictEqual(listHelper.totalLikes(blog), 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const blog = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
      },
    ];

    assert.strictEqual(listHelper.totalLikes(blog), blog[0].likes);
  });
});

describe("Favorite blog", () => {
  test("blog with most likes", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2]);
  });

  test("Most blogs", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("Most likes", () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
