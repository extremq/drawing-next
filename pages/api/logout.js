import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";

async function logoutRoute (req, res) {
    req.session.destroy();
    res.send({ ok: true });
};

export default withIronSessionApiRoute(
    logoutRoute,
    sessionOptions,
);
