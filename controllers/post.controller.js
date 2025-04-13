import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.render('index', { posts });
};

// Get single post
export const getPostById = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ postId: req.params.id }).populate('userId', 'userName');
      if (post) {
          res.render('post', { post, comments });
      } else {
          res.status(404).send('Post not found');
      }
  } catch (err) {
      res.status(500).send('Server error');
  }
};

// Create post
export const createPost = async (req, res) => {
  const newPost = {
    id: Date.now().toString(),
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
  };
  await Post.create(newPost);
  res.redirect('/home');
};

// Update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body; // Get updated data from form
  try {
      await Post.findByIdAndUpdate(postId, { title, content }); // Update in database
      res.redirect('/home'); // Redirect to the home or posts page
  } catch (error) {
      res.status(500).send('Error updating post.');
  }
};

export const editPost = async (req, res) => {
  const postId = req.params.id;
  try {
      const post = await Post.findById(postId); // Fetch post from database
      res.render('edit', { post }); // Pass post data to the EJS file
  } catch (error) {
      res.status(500).send('Error retrieving post for editing.');
  }
};

// Delete post
export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/home');
};
export const editorPage = async (req, res) => {
  const posts = await Post.find();
  res.render('view', { posts: posts });
};

export const addComments = async (req, res) => {
  try {
      const { postId, content } = req.body;

      // Create a new comment
      const newComment = await Comment.create({
          content,
          userId: req.user._id, // Assuming the user is logged in
          postId,
      });

      // Add the comment to the corresponding post
      await Post.findByIdAndUpdate(postId, {
          $push: { comments: newComment._id }
      });

      res.redirect(`/posts/${postId}`); // Redirect back to the blog page
  } catch (error) {
      console.error(error);
      res.status(500).send('Error adding comment');
  }
};