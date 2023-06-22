import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

async function loginRoute (req, res) {
    // Check token
    if (req.body.token !== process.env.ADMIN_TOKEN) {
        return res.status(401).send({ ok: false });
    }

    // Set token for session
    req.session.auth = {
        token: req.body.token,
    };

    await req.session.save();

    // Return success
    res.send({ ok: true });
};

export default withIronSessionApiRoute(
    loginRoute,
    sessionOptions,
);