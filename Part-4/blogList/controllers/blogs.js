const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");

//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }
//   return null;
// };

blogsRouter.get("/", async (req, res) => {
  console.log("6 - FROM GET REQUEST");

  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
  // .then((result) => {
  //   res.json(result);
  // });
});

blogsRouter.get("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  res.status(200).json(blog);
  // .then((result) => {
  //   if (result) {
  //     res.json(result);
  //   } else {
  //     res.status(404).end();
  //   }
  // })
  // .catch((err) => next(err));
  next();
});

blogsRouter.post("/", userExtractor, async (req, res) => {
  const userInfo = req.user;
  const body = req.body;

  console.log("1 - FROM POST REQUEST");

  /* Check the validity of the token sent by the request, 
  it will check the signature with the secret key
  and return the decoded payload(the original object stored in the token) */
  // const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  // const decodedToken = jwt.verify(req.token, process.env.SECRET);
  /*Why is this being verified here again 
  if it was already verified inside the userExtractor middleware?*/
  if (!userInfo.id) {
    return response.status(401).json({ error: "Invalid token" });
  }

  /* This will search for the user in the DB using the user's id, 
  that was returned by decodedToken */
  const user = await User.findById(userInfo.id);
  /*THis is also done by the middleware userExtractor, am I repeating things here?
  I feel like 'decodedToken' and 'this findById should have been perfomed by the middle ware?
  and then returned only the result here?'*/

  // if (!user) {
  //   return res.status(400).json({ error: "userId missing or not valid" });
  // }

  if (!userInfo) {
    return res.status(400).json({ error: "userId missing or not valid" });
  }

  if (!body) {
    return res.status(400).json({ error: "content is missing" });
  } else if (!body.title || !body.url) {
    return res.status(400).json({ error: "Title or url missing" });
  }

  //Creating actual blog to be saved in DB with (req info + user Id from DB)
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  //Saving newBlog to DB
  const savedBlog = await newBlog.save();

  //Appending new blog to user
  user.blogs = user.blogs.concat(savedBlog._id);

  //Saving user again with new appended blog
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  console.log("7 - FROM PUT REQUEST");

  /* By default, 'findByIdAndUpdate' doesn't return the new updated item,
  you must add {new: true} in the options object */
  const blog = await Blog.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    },
    { new: true },
  );
  // console.log("Item updated in blog list", blog);
  res.status(200).json(blog);

  // .then((result) => {
  //   console.log(result, "Item updated in blog list");
  //   res.status(200).json(result);
  // })
  // .catch((err) => next(err));
});

blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const userInfo = req.user;

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    } else if (decodedToken.id !== blog.user.toString()) {
      return res
        .status(403)
        .json({ error: "User not authorized for operation" });
    }

    /* Specific when client knows what they are deleting
  don't need to return anything, more efficient
  cause it's less bandwidth */
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }

  /* This is also ok , to use 200 status code
  and send deleted obj back to the client
  in case the client wants to check what was deleted */
  // const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
  // res.status(200).json(deletedBlog)

  /*  
  204 + .end()	Client already knows what they deleted
  200 + .json(obj)	Client needs confirmation of deleted data
  */
});

module.exports = blogsRouter;
