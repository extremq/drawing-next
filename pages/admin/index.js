import Head from 'next/head'
import Link from 'next/link'
import Layout from 'app/layout'
import useAdmin from '@/lib/useAdmin'

export default function About() {
    useAdmin({
        redirectTo: '/login',
    })

    return (
        <Layout>
            <Head>
                <title>Admin</title>
            </Head>

            <main>
                <h1 className="text-4xl font-bold text-center">
                    You're an admin!
                </h1>

                <Link href="/">
                    Home
                </Link>
            </main>
        </Layout>
    )
}