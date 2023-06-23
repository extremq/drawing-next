import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import createAdminRecord from "@/lib/createAdminRecord";

async function loginRoute(req, res) {
    const { token, captcha } = req.body;

    if (req.method !== "POST") {
        // Create admin record
        await createAdminRecord(req, "Unsuccessful login.");

        return res.status(405).send({ ok: false, message: "Method not allowed." });
    }

    if (!token || !captcha) {
        // Create admin record
        await createAdminRecord(req, "Unsuccessful login.");

        return res.status(422).send({ ok: false, message: "Missing token or captcha." });
    }

    try {
        // Verify captcha
        const captchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            },
        });

        const captchaData = await captchaResponse.json();

        if (captchaData.success && token === process.env.ADMIN_TOKEN) {
            // Set token for session
            req.session.auth = {
                token: token,
            };

            await req.session.save();

            // Create admin record
            await createAdminRecord(req, "Successful login.");

            // Return success
            res.send({ ok: true });
        }
        else {
            // Create admin record
            await createAdminRecord(req, "Unsuccessful login.");

            // Return error
            res.status(401).send({ ok: false, message: "Invalid token or captcha." });
        }
    } catch (error) {
        // Create admin record
        await createAdminRecord(req, "Unsuccessful login.");

        // Return error
        res.status(500).send({ ok: false, message: "Something went wrong." });
    }
};

export default withIronSessionApiRoute(
    loginRoute,
    sessionOptions,
);