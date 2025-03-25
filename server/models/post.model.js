import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    content: {
        type: String,
        required: true
    },

    // tags: [String],

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: Date,
}, 

{
    timestamps: true // Automatically manage createdAt/updatedAt
});

const Post = mongoose.model('Post', postSchema);

export default Post;
