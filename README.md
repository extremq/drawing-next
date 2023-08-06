# REMOVED
No, don't worry, I didn't just give up. I had to choose between piano and drawing. At first, I chose drawing, but after exploring it I was drawn by the piano way more.

# Drawing
Well, this is a Next.js app you can find at [desenez.eu](https://desenez.eu). I use it to post my drawings.

## How to run
1. Clone the repo
1. Run `npm install`
1. Set `COOKIE_PASSWORD`, `ADMIN_TOKEN` in your environment variables. Please set them to something really hard to guess.
1. Set `MONGODB_URI` for your MongoDB database. I recommend using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
1. Set `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` for your [reCAPTCHA](https://www.google.com/recaptcha/about/) keys. You can get them [here](https://www.google.com/recaptcha/admin/create). I use reCAPTCHA to prevent spam on login and comments.
1. Set `NEXT_PUBLIC_GOOGLE_ANALYTICS` for your [Google Analytics](https://analytics.google.com/) key. You can get it [here](https://analytics.google.com/analytics/web/).
1. Run `npm run dev`
1. Open [http://localhost:3000](http://localhost:3000)
1. Enjoy!

## How to deploy
I recommend using [Vercel](https://vercel.com) to deploy this app. It's free and it's easy to set up. 
