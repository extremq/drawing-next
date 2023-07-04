import 'app/globals.css'
import Head from 'next/head'
import Navbar from '@/app/components/Navbar'
import Script from 'next/script'

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
                <meta name="og:title" content={`${title} | desenez.eu`} />
                <meta name="twitter:card" content="summary_large_image" />
                <title>{title}</title>
            </Head>
            <div className="container mx-auto max-w-4xl px-2">
                <Navbar />
                <h1 className="text-4xl font-bold mb-3">
                    {title}
                </h1>
                {children}
            </div>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

            <Script strategy="lazyOnload">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
                });
            `}
            </Script>
        </div>
    )
}
