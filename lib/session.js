// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
    password: process.env.COOKIE_PASSWORD,
    cookieName: "admin-auth",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  };