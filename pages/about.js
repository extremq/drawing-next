import Head from 'next/head'
import Link from 'next/link'
import Layout from 'app/layout'

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About</title>
            </Head>

            <main>
                <h1 className="text-4xl font-bold text-center">
                    About
                </h1>

                <Link href="/">
                    Home
                </Link>
            </main>
        </Layout>
    )
}