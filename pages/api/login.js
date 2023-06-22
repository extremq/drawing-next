import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "./_session";

async function loginRoute (req, res) {
    // Check token
    if (req.body.token !== process.env.ADMIN_TOKEN) {
        return res.status(401).send({ ok: false });
    }

    // Set admin auth for session
    req.session.auth = {
        admin: true,
    };

    await req.session.save();

    // Return success
    res.send({ ok: true });
};

export default withIronSessionApiRoute(
    loginRoute,
    sessionOptions,
);