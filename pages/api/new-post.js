import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Post from "@/lib/models/Post";
import dbConnect from "@/lib/db";

async function newPostRoute (req, res) {
    // Check admin auth
    if (!(req.session.auth && req.session.auth?.token === process.env.ADMIN_TOKEN)) 
        return res.status(401).send({ ok: false, message: "Unauthorized." });

    // Check method
    if (req.method !== "POST")
        return res.status(405).send({ ok: false, message: "Method not allowed." });

    const body = req.body;
    const { title, caption, tags, timestamp, images } = body;

    console.log({title, caption, tags, timestamp});

    // Connect to database
    await dbConnect();

    // Create post
    const post = new Post({
        title: title,
        caption: caption,
        tags: tags,
        timestamp: timestamp,
        images: images,
    });

    // Save post
    await post.save();

    return res.status(200).send({ ok: true });
};

export default withIronSessionApiRoute(
    newPostRoute,
    sessionOptions,
);
