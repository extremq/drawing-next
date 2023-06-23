import mongoose from 'mongoose';

const AdminLogSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    browser: {
        type: String,
        required: true,
    },
});

export default mongoose.models.AdminLog || mongoose.model('AdminLog', AdminLogSchema);