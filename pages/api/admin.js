import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

async function adminRoute (req, res) {
    // Check admin auth
    if (req.session.auth && req.session.auth?.token === process.env.ADMIN_TOKEN) {
        res.json({
            admin: true,
        });
    }
    else {
        res.json({
            admin: false,
        });
    }
};

export default withIronSessionApiRoute(
    adminRoute,
    sessionOptions,
);