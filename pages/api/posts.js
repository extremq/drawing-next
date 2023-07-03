import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Post from "@/lib/models/Post";
import dbConnect from "@/lib/db";

async function postsRoute (req, res) {
    // Check method
    if (req.method !== "GET")
        return res.status(405).send({ ok: false, message: "Method not allowed." });

    // Connect to database
    await dbConnect();
    
    // Get start and end timestamps
    const { from, to } = req.query;

    // Get posts
    const posts = await Post.find({
        timestamp: {
            $gte: from,
            $lte: to,
        },
    });

    // Return only first image
    posts.forEach((post) => {
        post.images = post.images[0];
    });
    
    return res.status(200).send({ ok: true, posts: posts });
};

export default withIronSessionApiRoute(
    postsRoute,
    sessionOptions,
);
