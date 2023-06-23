import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Tokens from 'csrf';

const tokens = new Tokens();

async function csrfRoute(req, res) {
    let secret = req.session.csrfSecret;

    if (!secret) {
        secret = await tokens.secret();
        req.session.csrfSecret = secret;
        await req.session.save();
    }

    const csrfToken = tokens.create(secret);
    res.json({ csrfToken });
}

export default withIronSessionApiRoute(csrfRoute, sessionOptions);
