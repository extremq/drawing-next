# Drawing
Well, this is a Next.js app you can find at [desenez.eu](https://desenez.eu). I use it to post my drawings.

## How to run
1. Clone the repo
2. Run `npm install`
3. Set `COOKIE_PASSWORD`, `ADMIN_TOKEN` in your environment variables. Please set them to something really hard to guess.
4. Set `MONGODB_URI` for your MongoDB database. I recommend using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
5. Set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` for your [reCAPTCHA](https://www.google.com/recaptcha/about/) keys. You can get them [here](https://www.google.com/recaptcha/admin/create). I use reCAPTCHA to prevent spam on login and comments.
6. Run `npm run dev`
7. Open [http://localhost:3000](http://localhost:3000)
8. Enjoy!

## How to deploy
I recommend using [Vercel](https://vercel.com) to deploy this app. It's free and it's easy to set up. 
