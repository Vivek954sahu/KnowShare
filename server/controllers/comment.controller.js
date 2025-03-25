import Comment from "../models/comment.model.js";
import { getIO } from "../socket.js";



// Add Comment
export const addComment = async (req, res) => {

    const { content, postId } = req.body;

    try {
        const newComment = new Comment({
            content,
            post: postId,
            username: req.user._id,
        });

        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id)
            .populate('username');

            const io = getIO();

        // Emit comment to all connected clients
        io.emit('receive-comment', populatedComment);

        res.status(201).json(populatedComment);

    } catch (err) {
        res.status(500).json({ message: 'Failed to add comment', error: err.message });
    }
};


// Get comments for a post
export const getCommentsByPost = async (req, res) => {

    const { postId } = req.params;

    try {
        const comments = await Comment.find({ post: postId })
            .populate('username')
            .sort({ createdAt: -1 });

        res.json(comments);

    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
    }

};