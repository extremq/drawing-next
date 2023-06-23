import mongoose from 'mongoose';
import CommentSchema from './Comment.js';

const PostSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true,
    },
    title: {
        type: String,
        default: "No title",
        required: true,
    },
    caption: {
        type: String,
        default: "No caption",
        required: true,
    },
    categories: {
        type: [String],
        default: [],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    comments: {
        type: [CommentSchema],
        default: [],
        required: true,
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);