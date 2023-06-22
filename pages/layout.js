import 'app/globals.css'
import Head from 'next/head'
import Navbar from '@/app/components/navbar';

export const siteTitle = 'My drawing journey | desenez.eu';

export default function RootLayout({ children, title }) {
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
                <title>{title}</title>
            </Head>
            <div className="container mx-auto max-w-sm lg:max-w-4xl">
                <Navbar />
                <h1 className="text-4xl font-bold mb-3">
                    {title}
                </h1>
                {children}
            </div>

        </div>
    )
}
