import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Tag from "@/lib/models/Tag";
import dbConnect from "@/lib/db";

async function tagsRoute (req, res) {
    // Check admin auth
    if (!(req.session.auth && req.session.auth?.token === process.env.ADMIN_TOKEN)) 
        return res.status(401).send({ ok: false, message: "Unauthorized." });

    // Check method
    if (req.method !== "GET")
        return res.status(405).send({ ok: false, message: "Method not allowed." });

    // Connect to database
    await dbConnect();

    // Get tags
    const tags = await Tag.find({});

    // Return tags
    return res.status(200).send({ ok: true, tags: tags });
};

export default withIronSessionApiRoute(
    tagsRoute,
    sessionOptions,
);
