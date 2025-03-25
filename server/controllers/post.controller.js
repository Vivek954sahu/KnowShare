import Post from "../models/post.model.js";

// Create a Post
export const createPost = async (req, res) => {

    const { title, content } = req.body;

    try{
        const newPost = new Post({
            title,
            content, 
            author: req.user._id,
        });

        await newPost.save();

        res.status(201).json({ message:"Post created successfully!" });
    }catch(error){
        res.status(500).json({ message: 'Failed to create post', error: error.message });
    }

};


// Get all posts
export const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });

        res.status(201).json(posts);
    }catch(err){
        res.status(500).json({ message:"Failed to fetch posts!", error:err.message });
    }
};


// Get a single post
export const getPostById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate('author', 'username');

        if (!post) return res.status(404).json({ message: 'Post not found' });
        
        res.status(201).json(post);
    }catch(err){
        res.status(500).json({ message:"Failed to fetch post!", error:err.message });
    }
};