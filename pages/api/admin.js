import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "./_session";

async function adminRoute (req, res) {
    // Check admin auth
    if (req.session.auth) {
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