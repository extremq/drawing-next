import Head from 'next/head'
import Link from 'next/link'
import Layout from 'app/layout'

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Next.js + Tailwind CSS + TypeScript Example</title>
            </Head>

            <main>
                <h1 className="text-4xl font-bold text-center">
                    Next.js + Tailwind CSS + TypeScript Example
                </h1>

                {
                    // Check if the user is logged in
                    
                }
                <Link href="/login">
                    Login
                </Link>

                <Link href="/about">
                    About
                </Link>
            </main>
        </Layout>
    )
}