import Post from "../model/postmodel.js";

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().select("-__v"); // exclude the __v field when sending data to client

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
const createPost = async (req, res) => {
  const { title, description } = req.body;
  try {
    const post = await Post.create({ title, description });
    res.status(201).json({ message: "Post created" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const updateposts = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  try {
    if (!post) {
      return res
        .status(404)
        .json({ message: "The post with the given ID was not found." });
    }
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    const updatedPost = await post.save();
    res.status(200).json({
      id: updatedPost.id,
      title: updatedPost.title,
      description: updatedPost.description,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind == "ObjectId") {
      return res.status(400).json({ message: "Invalid ID" });
    }
    res.status(500).json({ message: e.message });
  }
};
const getsinglePosts = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ post });
  } catch (error) {
    if (error.name === "CastError" && error.kind == "ObjectId") {
      return res.status(400).json({ message: "Invalid ID" });
    }
    res.status(500).json({ message: e.message });
  }
};
const deletePosts = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.status(200).json("Deleted");
  } catch (error) {
    if (error.name === "CastError" && error.kind == "ObjectId") {
      return res.status(400).json({ message: "Invalid ID" });
    }
    res.status(500).json({ message: e.message });
  }
};

export { createPost, getPosts, updateposts, getsinglePosts, deletePosts };
