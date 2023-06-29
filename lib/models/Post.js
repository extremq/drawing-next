import mongoose from 'mongoose';

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
    tags: {
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
        type: [Object],
        default: [],
        required: true,
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);