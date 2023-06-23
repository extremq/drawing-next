import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
        minlength: 1,
    }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);