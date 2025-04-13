import express from 'express';
import Comment from '../models/Comment.js';
import { authenticateToken } from '../controllers/auth.controller.js';

const router = express.Router();

// Add a new comment
router.post('/add', authenticateToken, async (req, res) => {
    const { content, postId } = req.body;
    const userId = req.user._id; // Assuming `authenticateToken` sets `req.user`

    try {
        const newComment = await Comment.create({ content, postId, userId });
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add comment', error: err });
    }
});

// Get comments for a post
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId }).populate('userId', 'userName'); // Populate user info
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch comments', error: err });
    }
});

// Delete a comment
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id; // Assuming `authenticateToken` sets `req.user`

    try {
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        // Ensure the user deleting the comment is the owner
        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete comment', error: err });
    }
});

export default router;
