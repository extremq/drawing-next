import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    images: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        default: "No title",
    },
    caption: {
        type: String,
        default: "No caption",
    },
    tags: {
        type: [String],
        default: []
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    comments: {
        type: [Object],
        default: []
    },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);