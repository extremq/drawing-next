import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Tag from "@/lib/models/Tag";

async function tagsRoute (req, res) {
    // Check admin auth
    if (!(req.session.auth && req.session.auth?.token === process.env.ADMIN_TOKEN)) 
        return res.status(401).send({ ok: false, message: "Unauthorized." });

    // Get tags
    const tags = await Tag.find({});

    // Return tags
    // TODO: Return tags
    res.json({
        tags: [
            {
                "name": "sample-tag-1",
                "count": 1,
            },
            {
                "name": "sample-tag-2",
                "count": 2,
            },
        ],
    });
};

export default withIronSessionApiRoute(
    tagsRoute,
    sessionOptions,
);
