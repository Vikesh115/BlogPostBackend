const mongoose = require("mongoose");
const Post = require("../models/Post");

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Fetch the post and populate the author
    const post = await Post.findById(id).populate("author");
    console.log("Fetched Post:", post);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the author exists
    if (!post.author) {
      return res.status(500).json({ message: "Post author not found in the database" });
    }

    // Check if the logged-in user is the author
    if (post.author._id.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, image } = req.body;  // Image URL passed in the body
    console.log(req.body);  // Debugging the request body
    
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    // Ensure that req.user is populated by the middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated." });
    }

    const post = new Post({
      title,
      content,
      image: image || null,  // Image URL or null if not provided
      author: req.user, // Use the userId from req.user
    });

    const savedPost = await post.save();
    res.status(201).json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    // Populate the author field with user details (e.g., email and name)
    const posts = await Post.find().populate('author', 'email name');
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('author', 'email name');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("User from token:", req.user);
    console.log("Post author:", post.author.toString());

    // Only allow the author to update the post
    if (post.author.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update fields
    post.title = title || post.title;
    post.content = content || post.content;

    // If an image URL is provided, update the image
    if (image) {
      post.image = image;  // Update the image URL in the post
    }

    const updatedPost = await post.save();
    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};






module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
