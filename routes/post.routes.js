import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  editorPage,
  editPost,
  addComments,
} from '../controllers/post.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/home', authenticateToken, getAllPosts);
router.get('/posts/:id', authenticateToken, getPostById);
router.post('/posts', authenticateToken, createPost);
router.get('/posts/edit/:id', authenticateToken, editPost);
router.post('/posts/update/:id', authenticateToken, updatePost);
router.post('/posts/delete/:id', authenticateToken, deletePost);
router.post('/comments/add', authenticateToken, addComments)
router.get('/new', authenticateToken, (req, res) => res.render('new'));
router.get('/editor', authenticateToken, editorPage);

export default router;
