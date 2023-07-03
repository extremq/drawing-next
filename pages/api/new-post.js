import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Post from "@/lib/models/Post";
import dbConnect from "@/lib/db";
import Tag from "@/lib/models/Tag";

async function newPostRoute (req, res) {
    // Check admin auth
    if (!(req.session.auth && req.session.auth?.token === process.env.ADMIN_TOKEN)) 
        return res.status(401).send({ ok: false, message: "Unauthorized." });

    // Check method
    if (req.method !== "POST")
        return res.status(405).send({ ok: false, message: "Method not allowed." });

    const body = req.body;
    let { title, caption, tags, timestamp, images } = body;

    // Set default values to undefined
    if (!title) title = undefined;
    if (!caption) caption = undefined;
    if (!tags) tags = undefined;
    if (!timestamp) timestamp = undefined;
    if (!images) images = undefined;

    console.log({title, caption, tags, timestamp});

    // Connect to database
    await dbConnect();

    for (const tag of tags) {
        // Enforce az-09
        const regex = /^[a-z0-9-]+$/;
        if (!regex.test(tag)) {
            return res.status(400).send({ ok: false, message: "Tags can only contain lowercase letters, numbers and dashes." });
        }

        const tagExists = await Tag.exists({ name: tag });
        if (!tagExists) {
            const newTag = new Tag({
                name: tag,
                count: 1,
            });
            await newTag.save();
        } else {
            await Tag.findOneAndUpdate({ name: tag }, { $inc: { count: 1 } });
        }
    }

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

    // Return id
    return res.status(200).send({ ok: true, id: post._id });
};

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}

export default withIronSessionApiRoute(
    newPostRoute,
    sessionOptions,
);
