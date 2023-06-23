import AdminLog from "@/lib/models/AdminLog";
import dbConnect from "@/lib/db";

async function createAdminRecord (req, action) {
    const forwarded = req.headers["x-forwarded-for"]
    const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  
    // Connect to database
    await dbConnect();
    
    // Create admin log
    await AdminLog.create({
        ip,
        action,
        browser: req.headers["user-agent"],
    });
};

export default createAdminRecord;