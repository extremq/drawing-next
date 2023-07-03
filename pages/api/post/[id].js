import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import dbConnect from "@/lib/db";
import Post from "@/lib/models/Post";

async function postRoute(req, res) {
    // Check method
    if (req.method !== "GET")
        return res.status(405).send({ ok: false, message: "Method not allowed." });

    // Connect to database
    await dbConnect();

    try {
        console.log(req.query)

        // Get id
        const id = req.query.id;

        // Get post
        const post = await Post.findById(id);

        // Check if post exists
        if (!post) return res.status(404).send({ ok: false, message: "Post not found." });

        // Return post
        return res.status(200).send({ ok: true, post: post });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({ ok: false, message: "Internal server error." });
    }
};

export default withIronSessionApiRoute(
    postRoute,
    sessionOptions,
);
