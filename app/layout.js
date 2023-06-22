import './globals.css'
import Head from 'next/head'

const name = 'extremq';
export const siteTitle = 'My drawing journey | desenez.eu';

export default function RootLayout({ children }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="extremq's drawing journey"
                />
                {/* <meta
                    property="og:image"
                    content=
                /> */}
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {children}
        </div>
    )
}
