import mongoose from "mongoose";



const postSchema = new mongoose.Schema({

    title: {

        type: String,
        required: true

    },

    content: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Post = mongoose.model('Post', postSchema);

export default Post;